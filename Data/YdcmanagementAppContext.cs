using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace YDCManagementApp.Data;

public partial class YdcmanagementAppContext : DbContext
{
    public YdcmanagementAppContext(DbContextOptions<YdcmanagementAppContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Client> Clients { get; set; }

    public virtual DbSet<ClientContact> ClientContacts { get; set; }

    public virtual DbSet<Project> Projects { get; set; }

    public virtual DbSet<Expertise> Expertises { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<Logs> Logs { get; set; }

    public virtual DbSet<ProjectHoursLog> ProjectHoursLogs { get; set; }

    public virtual DbSet<ClientInfo> ClientInfo { get; set; }

    public virtual DbSet<ArchivedProjects> ArchivedProjects { get; set; }

    public virtual DbSet<Functions> Functions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Client>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Client__3214EC074C5D7EC0");

            entity.ToTable("Client");

            entity.Property(e => e.CompanyName).HasMaxLength(50);
            entity.Property(e => e.Website).HasMaxLength(50);
        });

        modelBuilder.Entity<ClientContact>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__ClientCo__3214EC07F23E3B99");

            entity.ToTable("ClientContact");

            entity.Property(e => e.CallingCodeMobile).HasMaxLength(10);
            entity.Property(e => e.CallingCodeOffice).HasMaxLength(10);
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.FunctionId);
            entity.Property(e => e.Infix).HasMaxLength(10);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.MobileNumber).HasMaxLength(15);
            entity.Property(e => e.OfficePhoneNumber).HasMaxLength(15);

            entity.HasOne(d => d.Client).WithMany(p => p.ClientContacts)
                .HasForeignKey(d => d.ClientId)
                .HasConstraintName("FK_ClientContact_Client");

            entity.HasOne(d => d.Functions).WithMany(p => p.ClientContacts)
                .HasForeignKey(d => d.FunctionId)
                .HasConstraintName("FK_ClientContact_Functions");

        });

        modelBuilder.Entity<Expertise>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Expertis__3214EC0758F8790E");

            entity.ToTable("Expertise");

            entity.Property(e => e.Name).HasMaxLength(50);

        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Project__3214EC071A86BDA7");

            entity.ToTable("Project");

            entity.Property(e => e.ProjectDescription).HasMaxLength(600);
            entity.Property(e => e.ProjectName).HasMaxLength(50);

            entity.HasOne(d => d.Client).WithMany(p => p.Projects)
                .HasForeignKey(d => d.ClientId)
                .HasConstraintName("FK_Project_Client");

            entity.HasOne(d => d.Contact).WithMany(p => p.Projects)
                .HasForeignKey(d => d.ContactId)
                .HasConstraintName("FK_Project_ClientContact");
            
            entity.HasOne(d => d.Expertise).WithMany(p => p.Projects)
                .HasForeignKey(d => d.ExpertiseId)
                .HasConstraintName("FK_Project_Expertise");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK_User_1");

            entity.ToTable("User");

            entity.Property(e => e.UserId).HasMaxLength(50);
            entity.Property(e => e.FirstName).HasMaxLength(50);
            entity.Property(e => e.LastName).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(50);

        });

        modelBuilder.Entity<ProjectHoursLog>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ProjectHoursLog");

            entity.ToTable("ProjectHoursLog");
            
            entity.Property(e => e.UserId).HasMaxLength(50);
            entity.Property(e => e.DateStartTime).HasColumnType("datetime");
            entity.Property(e => e.DateEndTime).HasColumnType("datetime");
            entity.Property(e => e.DateTimeDiff).HasMaxLength(10);

            entity.HasOne(d => d.User).WithMany(p => p.ProjectHoursLogs)
                .HasForeignKey(d => d.UserId)  
                .HasConstraintName("FK_ProjectHoursLog_User");
        });

        modelBuilder.Entity<ClientInfo>(entity => 
        {
            entity.HasKey(e => e.Id).HasName("PK_Clientinfo");

            entity.ToTable("ClientInfo");


            entity.Property(e => e.Street).HasMaxLength(50);
            entity.Property(e => e.ZipCode).HasMaxLength(50);
            entity.Property(e => e.State).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.AddressNum).HasMaxLength(10);

            entity.HasOne(d => d.Client).WithMany(c => c.ClientInfo)
                .HasForeignKey(c => c.ClientId)
                .HasConstraintName("FK_ClientInfo_Client");

        });

        modelBuilder.Entity<Logs>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PK_Logs");

            entity.Property(e => e.TableName).HasMaxLength(50);
            entity.Property(e => e.ErrorMessage).HasMaxLength(200);
            entity.Property(e => e.Method).HasMaxLength(20);
            entity.Property(e => e.OldValues).HasMaxLength(50);
            entity.Property(e => e.NewValues).HasMaxLength(50);
        });

        modelBuilder.Entity<ArchivedProjects>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ArchivedProjects");

            entity.ToTable("ArchivedProjects");

        });
        
        modelBuilder.Entity<Functions>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_Functions");
            entity.Property(e => e.FunctionName).HasMaxLength(50);
            entity.ToTable("Functions");
        });


        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
