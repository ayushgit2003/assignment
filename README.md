# Stratex Backend Assignment
This project is a Bookstore API that allows sellers to upload books via a CSV file and users to view the available books. It includes authentication and authorization using JWT tokens.

## Prerequisites

- Node.js (>= 14.x)
- PostgreSQL
- npm (comes with Node.js)
- Git

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/ayushgit2003/assignment
```
cd assignment

### 2.  Install Dependencies

```bash
npm install
```

### 3. Initialize TypeScript
```bash
npx tsc --init
```

### 4. Install Prisma
```bash
npm install @prisma/client
npm install prisma@4.6.1 --save-dev
```

### 5. Set Up Environment Variables
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/database_name?schema=public"
JWT_SECRET="your_jwt_secret"
PORT=3000
```

### 6. Initialize Prisma
```bash
npx prisma init
npx prisma migrate dev --name init
```

### 7. Generate Prisma Client
```bash
npx prisma generate
```


### 8. Start the Project
```bash
npx ts-node index.ts
```

## API CURL


### User Registration
#### To register a new user, you can use the following curl command:
```bash
  curl --location 'http://localhost:3000/api/register/user' \
--header 'Content-Type: application/json' \
--data-raw '{  
    "name":"Ayush",  
    "email": "ayush@gmail.com",
    "password": "password123"
}'
```



### Seller Registration
#### To register a new seller, you can use the following curl command:
```bash
curl --location 'http://localhost:3000/api/register/seller' \
--header 'Content-Type: application/json' \
--data-raw '{  
    "name":"Ayush",  
    "email": "ayush@gmail.com",
     "password": "password123"
     }'
```


### Login User
#### To login a new user, you can use the following curl command:
```bash
curl --location 'http://localhost:3000/api/login/user' \
--header 'Content-Type: application/json' \
--data-raw '{
     "email": ayush@gmail.com",
     "password": "password123"
}'
```


### Login Seller
#### To login a new seller, you can use the following curl command:
```bash
curl --location 'http://localhost:3000/api/login/seller' \
--header 'Content-Type: application/json' \
--data-raw '{
      "email": "ayush@gmail.com",
     "password": "password123"
}'
```

### Upload Book list as csv file
#### To upload book list in csv format, you can use the following curl command:
```bash
curl --location 'http://localhost:3000/api/upload' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InNlbGxlciIsImlhdCI6MTcxNzEwNDYwOCwiZXhwIjoxNzE3MTA4MjA4fQ.aRh26SEins6r5DTwdYz_-lUDY2X--lhTK_zINrNhSWo' \
--form 'file=@"/C:/Users/ayush/OneDrive/Desktop/Node/csv.csv"'
```



### View All Books List
#### To view all books list , you can use the following curl command:
```bash
curl --location 'http://localhost:3000/api/books/'
```

### View Particular Book Details
#### To view Particular Book Details , you can use the following curl command:
```bash
curl --location 'http://localhost:3000/api/books/1'

```

### Update Particular Book Info
#### To Update Particular Book Info , you can use the following curl command:
```bash
curl --location --request PUT 'http://localhost:3000/api/books/1/' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InNlbGxlciIsImlhdCI6MTcxNzEwNDYwOCwiZXhwIjoxNzE3MTA4MjA4fQ.aRh26SEins6r5DTwdYz_-lUDY2X--lhTK_zINrNhSWo' \
--header 'Content-Type: application/json' \
--data '{
  "title": "New Title",
  "author": "New Author",
  "publishedDate":"10-01-2024",
  "price": 20.99
}'
```

### Delete Particular Book 
#### To delete Particular Book  , you can use the following curl command:
```bash
curl --location --request DELETE 'http://localhost:3000/api/books/31' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6InNlbGxlciIsImlhdCI6MTcxNzEwNDYwOCwiZXhwIjoxNzE3MTA4MjA4fQ.aRh26SEins6r5DTwdYz_-lUDY2X--lhTK_zINrNhSWo'
```

## Video Explanation

Open the video [link](https://www.youtube.com/watch?v=jWu5xeuFAeU) 
    
 

    
 