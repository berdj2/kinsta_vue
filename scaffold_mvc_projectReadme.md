# YDC Management App

## Database

Create database and tables. Id columns of **'ClientContact'** and **'Project'** table can be set to **'NOT NULL'** after proper testing and setup of the controllers and views.

```sql
CREATE DATABASE [your_db]
GO
USE [your_db]

CREATE TABLE Client (
Id INT PRIMARY KEY IDENTITY,
CompanyName NVARCHAR(50) NOT NULL,
Website NVARCHAR(50) NOT NULL,
ClientStatus bit NOT NULL, 
Street NVARCHAR(50) NOT NULL,
ZipCode NVARCHAR(50) NOT NULL,
State NVARCHAR(50) NOT NULL,
City NVARCHAR(50) NOT NULL,
Country NVARCHAR(50) NOT NULL,
AddressNum NVARCHAR(10) NOT NULL
)

CREATE TABLE ClientContact (
Id int PRIMARY KEY IDENTITY,
ClientId int,
FirstName NVARCHAR(50) NOT NULL,
Infix NVARCHAR(10),
LastName NVARCHAR(50) NOT NULL,
Email NVARCHAR(50) NOT NULL,
CallingCodeOffice NVARCHAR(10) NOT NULL,
OfficePhoneNumber NVARCHAR(15) NOT NULL, 
CallingCodeMobile NVARCHAR(10) NOT NULL,
MobileNumber NVARCHAR(15) NOT NULL
)

CREATE TABLE Project (Id int
PRIMARY KEY IDENTITY NOT NULL,
ProjectId INT,
ProjectName NVARCHAR(50) NOT NULL,
ProjectDescription NVARCHAR(50) NOT NULL,
ProjectDeadline DATETIME2(7) NOT NULL
)
```

##  Package Installs

Required Packages to use scaffolding commands in **'PowerShell-Terminal'**

```
dotnet tool install --global dotnet-ef.
```
```
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
```
```
dotnet add package Microsoft.EntityFrameworkCore.Design
```
```
dotnet add package Microsoft.VisualStudio.Web.CodeGeneration.Design
```
```
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

## Create Mvc project

create **'ModelViewController'** Project in absolute directory:
```
dotnet new mvc
```

## Scaffold 

To scaffold the **'DbContext'**, execute the following command based on your connection and database:

### Local Connection:

```
dotnet ef dbcontext scaffold "Data Source=localhost;Initial Catalog=CustomerManagementApp;Integrated Security=True;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer -o Data -f --no-onconfiguring
```

### Cloud Connection:

```
dotnet ef dbcontext scaffold "Server={server name};database={database};Trusted_connection=false;MultipleActiveResultSets=true;Encrypt=false;user id={your username};password={your password}" Microsoft.EntityFrameworkCore.SqlServer -o Data -f --no-onconfiguring
```
### Remove Before Git Commit

Remove the OnConfiguring method from the generated code before committing to Git. By using --no-onconfiguring there will no method be created that contains connection strings in the source code. 
If generated make sure to delete the method before pushing to github.

## Scaffold Views and Controllers

To scaffold views and controllers, execute following command:
```
dotnet aspnet-codegenerator controller -name ClientController -dc CustomerManagementAppContext --relativeFolderPath Controllers --useDefaultLayout --referenceScriptLibraries -f -m Client 
```

This command generates the CRUD views and a controller named **'ClientController'**. Modify the **'-name'** and **'-m'** arguments to scaffold new controllers and models.

### Author:

Bram Stronkman
