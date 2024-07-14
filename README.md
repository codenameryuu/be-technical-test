# BE Technical Test Documentation

## Overview
This document outlines the setup and structure of BE technical test API. This apps are using :
- Nest JS as main framework
- Type orm for managing Mysql database
- Joi for validation

## System Requirements
- Node Js >= 20.0
- Mysql >= 8.0
- Composer for dependency management

## Installation Steps

1. **Clone the Repository**

   Clone the project and move to project directory
   ```bash
   https://github.com/codenameryuu/be-technical-test.git
   ```

2. **Install Dependencies**
   ```bash
   yarn
   ```

3. **Setup Environment**
   
   Copy the `.env.example` file to `.env` and update the database and other configurations as necessary.
   ```bash
   cp .env.example .env
   ```

4. **Run Application**
   ```bash
   yarn start:dev
   ```

5. **Run Migration**
   ```bash
   yarn migrate:fresh
   ```

6. **Run Swagger**
  
    Run application first and then go to
   ```bash
   http://localhost:8000/docs
   ```

7. **Generate Example Data**
  
    You can generate example data by hit this endpoint in swagger
   ```bash
   http://localhost:8000/api/example
   ```

8. **Run Test**
   ```bash
   yarn test
   ```

## Contributing
Contributions to the BE Technical Test project are welcome. Please ensure that your code adheres to the Nest JS best practices and include tests for new features.

## License
This BE Technical Test is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
