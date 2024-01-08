# YDC Management App 

The YDC Management App is a data management application built using the Entity Framework Core and Microsoft SQL Server. It provides functionality for managing clients, client contacts, and projects.

### Author:

Bram Stronkman.

## Prerequisites

Before running the application, ensure that you have the following prerequisites:

- **.NET Core SDK** - version 3.1 or higher
- **Microsoft SQL Server** - version 2016 or higher
- **Model View Controller** - asp-net version 7.0
- **Appsetings.Json** - not included in repository for safety purposes.
API keys and connection strings should be aquired through projectmanagement.

(included in .gitignore to prevent sensitive data to be pushed to github.)

## Run Application 

1. Change to the project directory:
   
  `cd YDCmanagementApp`

2. Run application:

  `dotnet run`

3. Or run in https mode if using Authentication:

  `dotnet run --launch-profile https`

# Database Schema

The application uses the following database schema:

## Table Descriptions

- **Client table**: Represents clients and their information.
- **ClientContact table**: Represents client contacts and their information.
- **Project table**:  Represents projects and their information.

## Table Relationships 

The relationships between the tables are as follows:

- A **Client** can have multiple **ClientContacts**. This represents a one-to-many relationship,
  where a client can be associated with multiple contact members of that company.
- A **Project** belaongs to a **Client** and a **ClientContact**. This represents a many-to-one relationship, where a project is associated with both a client and a client contact.

# CRUD Operations

## Index 
- **Description**: Retrieves the ViewModel containing projects and customer data for the index page
- **HTTP Method**: GET
- **URL**: /Client/Index

 The **'Index'** action method in the **'ClientController'** retrieves the ViewModel for the index page. It uses the 
 **'ProjectsAndCustomerService'** retrieves the ViewModel for the index page. It uses the contains the list of projects and customer data. 
 The ViewModel is then passed to the **'Index'** view for rendering.

## Details

- **Description**: Retrieves and displays the details of a specific client.
- **HTTP Method**: GET
- **URL**: /Client/Details/{id}
- **Parameters**:
     - **'id'**: The ID of the client to retrieve details for the page. primary of **'Client table'**

The **'Details'** action method in the **'ClientController'** retrieves the client with the specified **'id'** from the database. 
It also retrieves the associated projects and client contacts. If the client is found, a ViewModel (**'ProjectsAndCustomerViewModel'**) is created to hold the client details,
projects, and client contacts. The ViewModel is then passed to the **'Details'** view for rendering.

## Create

### GET

- **Description**: Displays the view for creating a new client
- **HTTP Method**: GET
- **URL**: /Client/Create

The **'Create'** action method in the **'ClientController'** displays the view for creating a new client. 
It simply returns the **'Create'** view.

### POST
- **Description**: Creates a new client based on the provided form data.
- **HTTP Method**: POST
- **URL**: /Client/Create
- **Parameters**:
     - **'Client'**: The client object containing form data.
       
The **'Create'** action method in the **'ClientController'** receives the form data from the view as a **'client'** object. It performs validation checks,
such as checking if the company name already exists. If the provided client data is valid, the client is added to the context and saved to the database.
 The user is then redirected to the **'Index'** action method to display the updated client list. If the provided client data is invalid, the **'Create'** view is returned with the entered data.

## Edit

### GET
- **Description**: Displays the view for editing existing client.
- **HTTP Method**: GET
- **URL**: /Client/Edit/{id}
- **Parameter**:
     - **'id'**: The ID of the client table to edit the corresponding client.

The **'Edit'** action method in the **'ClientController'** retrieves the client with the specified **'id'** from the database. 
If the client is found, the **'Edit'** view is returned with the client data. Otherwise, a **'NotFound'** response is returned.

### POST

- **Description**: Updates an existing client based on the provided form data.
- **HTTP Method**: POST
- **URL**: /Client/Edit/{id}
- **Parameter**:
     - **'id'**: The existing id of the client to update
     - **'client'**: The client object containing the form data.
     - 
The **'Edit'** action method in the **'ClientController'** receives the updated client data from the form as a client object.
It performs validation checks and updates the **'client'** in the context. If the provided client data is valid and the update is successful,
the user is redirected to the **'Details'** action method to display the updated client details.
If the provided client data is invalid or the client is not found, the **'Edit'** view is returned with the entered data or a **'NotFound'** response is returned.

## Delete

### GET

- **Description**: Displays theview for deleting an existing client.
- **HTTP Method**: GET
- **URL**: Client/Delete/{id}
- **Parameters**:
     - **'id'**: The ID of the client table to delete.

The **'Delete'** action method in the **'ClientController'** retrieves the client with the specified **'id'** from the database. 
If the client is found and has no associated client contacts or projects, the **'Delete'** view is returned to confirm the deletion. 
If the client has associated client contacts or projects, a warning message is displayed using the notification service, and the **'Delete'** view is returned with the client information.

### POST

- **Description**: Deletes an existing client.
- **HTTP Method**: POST
- **URL**: /Client/Delete/{id}
- **Parameters**:
     - **'id'**: The ID of the client table record to delete.

The **'DeleteConfirmed'** action method in the **'ClientController'** receives the confirmation to delete the client. It checks if the client has associated client contacts or projects. 
If it does, a warning message is displayed using the notification service, and the **'Delete'** view is returned with the client information. If the client has no associated client contacts or projects, 
the client is removed from the context and deleted from the database. The user is then redirected to the **'Index'** action method to display the updated client list.

# Program.cs Configurations

## Dependency Injections

The following services are registerd in the **'Program.cs'** file for dependency injection:

- **'YdcmanagementAppContext'**: The database context for the YDC Management App.
- **'INotyfService'**: The notification service used for displaying toast notifications.
- **'ProjectsAndCustomerService'**: A service that provides data related to projects and customers.
- **'IConfiguration'**: Iconfiguration grags sections from appsettings.json.

# Controllers.
Description of **'Methods'** listed down per controller.
Crud Operation **'Methods'** are explained in the **'CRUD OPERATIONS' section.
## ApiController.cs

### HttpRequest().
### Parameters:
- **apiUrl**: "https://yourdatacompany.atlassian.net/wiki/rest/api/space". 
(The Url for your browser the request is send to)

- **username**: takes username from appsettings.json
- **password**: takes password from appsettings.json
- **requestData**: request data is a c# model implementation that converts to json body along with the request.

### Method Description:

- **HTTP Client initialization**:
Inside the method, an HttpClient instance named client is created using a using statement. The using statement ensures that the HttpClient is properly disposed of after the request is complete.

- **Authentication Header**:
The code generates a basic authentication header by encoding the username and password as base64 and adds it to the request headers. This header is used to authenticate the request to the API server.

- **Content Type Header**:
The code sets the ContentType header to indicate that the request body will be in JSON format.

- **Request Data Serialization**:
The requestData object is serialized to a JSON-formatted string using the JsonConvert.SerializeObject method. This string will be the content of the request body.

- **POST Request**:
The client.PostAsync method is used to send an asynchronous HTTP POST request to the specified apiUrl. The request body contains the serialized JSON data. The content type of the request is also specified as "application/json".

- **Respone Handling**:
The response from the server is captured in the HttpResponseMessage object named response. The response's content is read asynchronously using response.Content.ReadAsStringAsync() to obtain the response body as a string.

- **Response Display**:
The status code of the response (response.StatusCode) and the response body (responseBody) are printed to the console using Console.WriteLine. This displays information about the server's response.

### ConfluenceApi().

- **Method Signature**:
The method is named ConfluenceApi and takes an int parameter id. This parameter is used to retrieve client information.

- **Get Client by ID**:
The method calls the GetClientByIdAsync method to retrieve a client object based on the provided id. The client object likely contains information about a specific company.

- **API URL and Credentials**:
The apiUrl variable is set to the Confluence API endpoint URL for creating content in a space. This is the URL where the request will be sent.

The userName and passWord variables are used to retrieve the credentials for authenticating the API request. These values are fetched from the application configuration using the IConfiguration interface.

- **Client Validation**:
The code checks if the client object is null. If it's null, it returns a NotFound() result. This indicates that if the client is not found based on the provided id, the method will return a 404 status.

- **Creating Confluence API Model**:
A ConfluenceApiModel object is created, representing the data that will be sent to the Confluence API. It includes:

The key property, derived from the first three characters of the CompanyName in uppercase.

The name property, set to the CompanyName.

A list named plains containing a single Plain object. This object holds the content to be posted on the Confluence page.

The Plain object includes a value property with a message that likely includes information about the company and contact details. The representation property is left empty.

- **Making API Request**:
The HttpRequest method is called to make an HTTP POST request to the Confluence API endpoint (apiUrl). It sends the userName, passWord, and the confluenceApiModel object as request data. This will create content in the specified Confluence space.

- **Returning a Result**:
The method returns a ContentResult with an empty content. This is likely a placeholder response that doesn't contain any relevant data.

## ClientContactController.cs

### CreateSelectLists()

Called in **CRUD operation** methods.

makes dropdown for **Id** from client table but display's **ClientName** to user.

assigns **ClientId** to **ClientContact**

'''
private void CreateSelectLists()
{
   // Retrieve the list of clients from the context and create an anonymous object with properties ClientName and Id
   var clients = _context.Clients.Select(q => new
   {
       ClientName = $"{q.CompanyName}",
       q.Id
   });

   // Store the select list in ViewData with key "Id" and set the data source to the clients list
   // Specify "Id" as the value field and "ClientName" as the text field
   ViewData["Id"] = new SelectList(clients, "Id", "ClientName");
   
'''

## ClientController.cs

### ClientExists()

method checks *if* client exists in database.

**returns** error message back to user if the user tries to add an existing **Client** to the database.

'''

private bool ClientExists(int id)
{
 return (_context.Clients?.Any(e => e.Id == id)).GetValueOrDefault();
}

'''

## ProjectHoursLogController.cs

### Description

 It is responsible for handling requests related to project hours logging.

### Actions

**public IActionResult Create()**
**Description:** This action handles the HTTP GET request to display the view for creating a new project hours log entry.
**Returns:** An IActionResult representing the view.
public async Task<IActionResult> Create([Bind("Id,UserId,ProjectId,Date,StartTime,EndTime")] ProjectHoursLog projectHoursLog, int ProjectId)
**Description:** This action handles the HTTP POST request to create a new project hours log entry.
**Parameters:**
**projectHoursLog:** An instance of ProjectHoursLog containing the log details.
**ProjectId:** An integer representing the ID of the project associated with this log entry.
**Returns:** A Task<IActionResult> representing the result of the action.
**Behavior:**
Binds the specified properties from the request to the projectHoursLog object.
Retrieves the current user's ID using the ClaimTypes.NameIdentifier.
Sets the ProjectId and UserId properties of projectHoursLog.
Adds the projectHoursLog to the database context.
Saves changes to the database.
Redirects to the Details action of the ProjectController with the specified ProjectId.
Usage
**Create View:**

This action displays a view for creating a new project hours log entry.
**Create POST:**

This action handles the submission of the create form.
It binds the request data to a ProjectHoursLog object.
Retrieves the current user's ID from claims.
Sets the ProjectId and UserId properties of the log.
Adds the log to the database and saves changes.
Redirects to the Details action of the ProjectController with the associated ProjectId.
