# Simple-Meeting

## Overview
This is a sample app for the meeting conference. You can access it here: <p> https://iotum.github.io/iotum-samples/simple-meeting/

## Login Instructions
To log in to the application, you'll need the following details:
- Domain Input
- SSO Token
- Host ID
- Access Code

>Note: This document guides you through acquiring the SSO token and Host ID using Postman.
><p>The documentation will utilize environment variables to retrieve data.

## Starting with Creating an Environment:
1. **Setting up Postman**: 
   - Download and open Postman.
   - From the left sidebar, select `Environment` and create a new environment.
     
## Getting the Authentication Token:
1. **Setting up Collection**:
   - From the left sidebar, select `Collections`.
   - Create a new collection.
   - Initiate a new request within this collection.
   - On the top right, choose to use the environment just created:
     
![image](https://github.com/iotum/iotum-samples/assets/109609935/43543dfa-601f-49ea-bdc5-6130a2aaa664)

2. **Setting the Request Type and URL**:
   - Choose `POST` as the request type.
   - In the URL input field, type in the base URL of your website followed by `/enterprise_api/authenticate`.
     > **Example**: If the website is `https://iotum.callbridge.rocks`, then your input would be:
     > `https://iotum.callbridge.rocks/enterprise_api/authenticate`

3. **Adding Query Parameters**:
   - In the Query Params section, create two keys: `email` and `password`.
   - Input your account information corresponding to these keys:
   
![image](https://github.com/iotum/iotum-samples/assets/109609935/7b33b375-cc1f-432a-9bba-bc4cfb81225c)

4. **Fetching the Token**:
   - Click `Send`.
   - Once the request is processed, you will receive your `auth_token` in the body of the response. 

5. **Create a Variable for the Token**:
   - Click `Pre-request Script`.
   - Insert `pm.environment.set("variable_key", "variable_value");` in the script.
      > **Example**: If you want to name your `auth_token` as `TOKEN`, then your input would be `pm.environment.set("auth_token", "TOKEN");`
   - Go back to `Environment`, and create a new Variable. Name it as `TOKEN`, in the current value, copy the `auth_token` value:
   
   ![image](https://github.com/iotum/iotum-samples/assets/109609935/f92d7ce7-2d78-4e03-b60e-e6c1fcdf67de)

   - Now you can refer your `auth_token` as `{{TOKEN}}`
  
## Getting the Company ID:

1. **Setting the Request Type and URL**:
   - Initiate a new request within the same collection.
   - Choose `POST` as the request type.
   - In the URL input field, type in the base URL of your website followed by `/enterprise_api/company/fetch_all`.
     > **Example**: If the website is `https://iotum.callbridge.rocks`, then your input would be:
     > `https://iotum.callbridge.rocks/enterprise_api/company/fetch_all`

2. **Adding Query Parameters**:
   - In the Query Params section, create a key named: `auth_token`.
   - Input `{{TOKEN}}`:
![image](https://github.com/iotum/iotum-samples/assets/109609935/8c8e84ec-91eb-483b-a054-6f0ac7575654)

3. **Fetching the Company ID**:
   - Click `Send`.
   - Once the request is processed, you will find your `company_id` in the body of the response. 
   - Save this ID for future reference.

## Getting the HOST ID:

1. **Setting the Request Type and URL**:
   - Initiate a new request within the same collection.
   - Choose `POST` as the request type.
   - In the URL input field, type in the base URL of your website followed by `/enterprise_api/host/fetch_all` 
     > **Example**: If the website is `https://iotum.callbridge.rocks`, then your input would be:
     > `https://iotum.callbridge.rocks/enterprise_api/host/fetch_all`

2. **Adding Query Parameters**:
   - In the Query Params section, create two keys: `auth_token` and `company_id`.
   - Input `{{TOKEN}}` and the `company_id` value you acquired in the previous steps: 
![image](https://github.com/iotum/iotum-samples/assets/109609935/0107452e-5d9b-4529-8d16-03eee73bd197)

3. **Fetching the Host ID**:
   - Click `Send`.
   - Once the request is processed, you will find your `host_id` in the body of the response. 
   - Save this ID for future reference.

## Getting the SSO Token:

1. **Setting the Request Type and URL**:
   - Initiate a new request within the same collection.
   - Choose `POST` as the request type.
   - In the URL input field, type in the base URL of your website followed by `/enterprise_api/host/fetch` 
     > **Example**: If the website is `https://iotum.callbridge.rocks`, then your input would be:
     > `https://iotum.callbridge.rocks/enterprise_api/host/fetch`

2. **Adding Query Parameters**:
   - In the Query Params section, create two keys: `auth_token` and `host_id`.
   - Input `{{TOKEN}}` and the `host_id` value you acquired in the previous steps: 
![image](https://github.com/iotum/iotum-samples/assets/109609935/8258b490-ab10-4a8a-a1a8-e2eef581ef4f)

3. **Fetching the SSO Token**:
   - Click `Send`.
   - Once the request is processed, you will find your `login_token_public_key` in the body of the response. 
   - Save this ID for future reference, this is the SSO token. 

## Login to the Application:

1. **Choosing the Domain**:
   - Select your desired domain.

2. **Entering SSO Token and Host ID**:
   - Input your SSO token and host ID.
   - Click on `Submit` to proceed.

3. **Entering the Access Code**:
   - Provide your access code. This is essentially your conference number which can be located in the `Meet` dashboard.

4. **Using the Application**:
   - After logging in, you can now utilize and explore the features of the iotum product. Enjoy!

