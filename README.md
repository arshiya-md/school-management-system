# School Management System API Documentation

## Authentication

### User Roles
- `super-admin`: System-wide administrator
- `school-admin`: Administrator for a specific school

### Authentication Flow
1. User Registration: `POST /api/user/register`
2. User Login: `GET /api/user/login`
   - Returns a long-lived authentication token
3. All subsequent requests require the token in the Authorization header

## API Endpoints

### User Management

#### Register User
- **Endpoint**: `POST /api/user/register`
- **Required Permissions**: None
- **Request Body**:
  ```json
  {
    "userName": "string",
    "email": "email@example.com",
    "password": "string",
    "role": "super-admin|school-admin",
    "schoolId": "optional_string"
  }
  ```
- **Success Response**:
  ```json
  {
    "user": { user object },
    "longToken": "authentication_token"
  }
  ```

#### Login User
- **Endpoint**: `POST /api/user/login`
- **Required Permissions**: None
- **Request Body**:
  ```json
  {
    "email": "email@example.com",
    "password": "string"
  }
  ```
- **Success Response**:
  ```json
  {
    "longToken": "authentication_token"
  }
  ```

### School Management

#### Create School
- **Endpoint**: `POST /api/school`
- **Required Permissions**: Super Admin
- **Request Body**:
  ```json
  {
    "name": "string",
    "address": "string",
    "adminId": "string",
    "email": "optional_email"
  }
  ```
- **Success Response**:
  ```json
  {
    "school": { school object }
  }
  ```

#### Update School
- **Endpoint**: `PUT /api/school/{schoolId}`
- **Required Permissions**: Super Admin
- **Request Body**:
  ```json
  {
    "name": "optional_string",
    "address": "optional_string",
    "email": "optional_email"
  }
  ```
- **Success Response**:
  ```json
  {
    "school": { updated school object }
  }
  ```

#### GET /apiSchool
- **Endpoint**: `GET /api/school/{schoolId}`
- **Required Permissions**: Super Admin
- **Success Response**:
  ```json
  {
    "school": { school object }
  }
  ```

#### List Schools
- **Endpoint**: `GET /api/schools`
- **Required Permissions**: Super Admin
- **Success Response**:
  ```json
  {
    "schools": [ array of school objects ]
  }
  ```

### Classroom Management

#### Create Classroom
- **Endpoint**: `POST /api/school/{schoolId}/classroom`
- **Required Permissions**: School Admin
- **Request Body**:
  ```json
  {
    "name": "string",
    "capacity": "number",
    "resources": ["optional_array_of_strings"]
  }
  ```
- **Success Response**:
  ```json
  {
    "classroom": { classroom object }
  }
  ```

### Student Management

#### Create Student
- **Endpoint**: `POST /api/school/{schoolId}/classroom/{classroomId}/student`
- **Required Permissions**: School Admin
- **Request Body**:
  ```json
  {
    "firstName": "string",
    "lastName": "string",
    "dateOfBirth": "date",
    "email": "optional_email"
  }
  ```
- **Success Response**:
  ```json
  {
    "student": { student object }
  }
  ```

## Error Handling

### Common Error Codes
- `400`: Bad Request (Validation Failed)
- `401`: Unauthorized (Invalid/Missing Token)
- `403`: Forbidden (Insufficient Permissions)
- `404`: Not Found
- `500`: Internal Server Error

### Error Response Format
```json
{
  "error": "Descriptive error message",
  "code": "optional_error_code"
}
```

## Validation Rules

### User
- Username: 3-20 characters
- Email: Valid email format
- Password: 8-100 characters
- Role: Must be 'super-admin' or 'school-admin'

### School
- Name: 3-100 characters
- Address: 5-250 characters
- Email: Optional, valid email format

### Classroom
- Name: 2-50 characters
- Capacity: Minimum 1
- Resources: Optional array of strings

### Student
- First/Last Name: 2-50 characters
- Date of Birth: Valid date
- Email: Optional, valid email format