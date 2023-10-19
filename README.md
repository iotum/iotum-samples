# Simple-Meeting

## Overview
This is a sample app for the meeting conference. You can access it here: https://iotum.github.io/iotum-samples/simple-meeting/

## Login Instructions
To log in to the application, you'll need the following details:
- Domain Input
- SSO Token
- Host ID
- Access Code

>Note: This document guides you through acquiring the SSO token and Host ID using Postman.

## Getting the Authentication Token:
1. **Setting up Postman**: 
   - Download and open Postman.
   - Create a new collection.
   - Initiate a new request within this collection.

2. **Setting the Request Type and URL**:
   - Choose `POST` as the request type.
   - In the URL input field, type in the base URL of your website followed by `/enterprise_api/authenticate`.
     > **Example**: If the website is `https://iotum.callbridge.rocks`, then your input would be:
     > `https://iotum.callbridge.rocks/enterprise_api/authenticate`

3. **Adding Query Parameters**:
   - In the Query Params section, create two keys: `email` and `password`.
   - Input your account information corresponding to these keys.
   
![image](https://github.com/iotum/iotum-samples/assets/109609935/7b33b375-cc1f-432a-9bba-bc4cfb81225c)

4. **Fetching the Token**:
   - Click `Send`.
   - Once the request is processed, you will receive your `auth_token` in the body of the response. 
   - Save this token for future reference.
  
## Getting the Company ID:

1. **Setting the Request Type and URL**:
   - Initiate a new request within the same collection.
   - Choose `POST` as the request type.
   - In the URL input field, type in the base URL of your website followed by `/enterprise_api/company/fetch_all`.
     > **Example**: If the website is `https://iotum.callbridge.rocks`, then your input would be:
     > `https://iotum.callbridge.rocks/enterprise_api/company/fetch_all`

2. **Adding Query Parameters**:
   - In the Query Params section, create a key named: `auth_token`.
   - Input the authentication token you acquired in the previous steps.
![URL example](https://github.com/iotum/iotum-samples/assets/109609935/eda1d620-00a9-4b2b-a88f-9ca1911ad33b)
   
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
   - Input the authentication token you acquired in the previous steps.
![image](https://github.com/iotum/iotum-samples/assets/109609935/c1484efb-418b-4d37-9c55-d622fd4159af)

3. **Fetching the Company ID**:
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
   - Input the authentication token you acquired in the previous steps.
![image](https://github.com/iotum/iotum-samples/assets/109609935/0cac74b2-b6e6-4337-82ef-733ad1b497b0)

3. **Fetching the Company ID**:
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


