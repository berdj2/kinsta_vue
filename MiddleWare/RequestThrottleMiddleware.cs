using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Concurrent;
using System.Threading.Tasks;


namespace RequestThrottle
{
    public class RequestThrottleMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ConcurrentDictionary<string, SemaphoreSlim> _throttlingDictionary;

        public RequestThrottleMiddleware(RequestDelegate next)
        {
            _next = next;
            _throttlingDictionary = new ConcurrentDictionary<string, SemaphoreSlim>();
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var clientId = context.Connection.RemoteIpAddress.ToString();
            var throttleKey = $"{clientId}:{context.Request.Path}";

            // Check if the throttle key exists in the dictionary
            if (!_throttlingDictionary.TryGetValue(throttleKey, out var semaphore))
            {
                semaphore = new SemaphoreSlim(1);
                _throttlingDictionary.TryAdd(throttleKey, semaphore);
            }

            try
            {
                await semaphore.WaitAsync();

                // Proceed with the request
                await _next(context);
            }
            finally
            {
                semaphore.Release();
            }
        }
    }

    public static class RequestThrottleExtensions
    {
        public static IApplicationBuilder UseRequestThrottle(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<RequestThrottleMiddleware>();
        }
    }
}