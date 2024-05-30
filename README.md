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
    
 