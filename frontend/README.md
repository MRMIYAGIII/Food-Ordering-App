Welcome to the Food Ordering Application project! This application allows users to browse through a list of restaurants and food items, manage orders, and interact with various features such as account management, cart functionality, and multi-language support. The project is built using a React frontend and a Spring Boot backend.

Project Structure
Frontend Structure
/assets: Contains images and assets used throughout the application (e.g., food images, icons).
/components: React components used to display UI elements such as navigation bars, carousels, and menu cards.
/Auth: Contains components for authentication such as login, registration, and password management.
/ui: Contains reusable UI components like buttons, cards, tables, and inputs.
/i18n: Internationalization files for multi-language support (e.g., English, Spanish, French).
/pages: React components representing different pages of the application (e.g., Cart, Home, Profile, Restaurant).
/redux: State management using Redux slices for authentication and restaurant data.
/router: React Router setup for navigation between pages.
/services: Contains service files that handle API requests and other business logic.
/Theme: Contains context for managing global themes (light/dark mode).
/utils: Utility functions and helper files.
Backend Structure
/src/main/java/com/prince: The main backend package containing Java files.
/config: Configuration files, including security and JWT settings.
/controller: REST API controllers for handling requests and responses related to food, orders, users, restaurants, etc.
/dto: Data Transfer Objects (DTOs) for exchanging data between the frontend and backend.
/model: Entities representing various business objects like User, Cart, Order, etc.
/repository: JPA repositories for data access.
/service: Service layer classes for business logic (with implementations in /impl).
/transformer: Utility classes for transforming entities into DTOs and vice versa.
/exception: Custom exceptions and error handling.
/resources: Configuration files and templates.
/test: Unit and integration tests for backend services.
Features
Multi-Language Support: The app supports multiple languages, including English, Spanish, and French.
User Authentication: Users can sign up, log in, reset passwords, and manage their profiles.
Restaurant and Menu Management: Browse and filter through restaurants and their menu items.
Cart and Order Management: Add items to the cart, place orders, and track order status.
Admin Dashboard: Admins can manage users, orders, and restaurants through a special dashboard.
Responsive Design: The frontend is designed to be responsive across different screen sizes using React-Bootstrap.
File Upload and Download: Supports uploading and downloading files (e.g., PDF invoices).
Secure Authentication: Utilizes JWT for secure user authentication.
Technologies Used
Frontend:
React: JavaScript library for building user interfaces.
React-Bootstrap: A UI library for building responsive and styled components.
Redux: For state management.
i18next: For internationalization support.
Axios: For making API requests.
Backend:
Spring Boot: Java framework for building the backend.
Spring Security: For handling authentication and authorization.
JWT: JSON Web Tokens for secure user authentication.
JPA/Hibernate: For ORM-based data access.
MySQL: Database for storing user and order data.

Welcome to the Food Ordering Application project! This application allows users to browse through a list of restaurants and food items, manage orders, and interact with various features such as account management, cart functionality, and multi-language support. The project is built using a React frontend and a Spring Boot backend.

Project Structure
Frontend Structure
/assets: Contains images and assets used throughout the application (e.g., food images, icons).
/components: React components used to display UI elements such as navigation bars, carousels, and menu cards.
/Auth: Contains components for authentication such as login, registration, and password management.
/ui: Contains reusable UI components like buttons, cards, tables, and inputs.
/i18n: Internationalization files for multi-language support (e.g., English, Spanish, French).
/pages: React components representing different pages of the application (e.g., Cart, Home, Profile, Restaurant).
/redux: State management using Redux slices for authentication and restaurant data.
/router: React Router setup for navigation between pages.
/services: Contains service files that handle API requests and other business logic.
/Theme: Contains context for managing global themes (light/dark mode).
/utils: Utility functions and helper files.
Backend Structure
/src/main/java/com/prince: The main backend package containing Java files.
/config: Configuration files, including security and JWT settings.
/controller: REST API controllers for handling requests and responses related to food, orders, users, restaurants, etc.
/dto: Data Transfer Objects (DTOs) for exchanging data between the frontend and backend.
/model: Entities representing various business objects like User, Cart, Order, etc.
/repository: JPA repositories for data access.
/service: Service layer classes for business logic (with implementations in /impl).
/transformer: Utility classes for transforming entities into DTOs and vice versa.
/exception: Custom exceptions and error handling.
/resources: Configuration files and templates.
/test: Unit and integration tests for backend services.
Features
Multi-Language Support: The app supports multiple languages, including English, Spanish, and French.
User Authentication: Users can sign up, log in, reset passwords, and manage their profiles.
Restaurant and Menu Management: Browse and filter through restaurants and their menu items.
Cart and Order Management: Add items to the cart, place orders, and track order status.
Admin Dashboard: Admins can manage users, orders, and restaurants through a special dashboard.
Responsive Design: The frontend is designed to be responsive across different screen sizes using React-Bootstrap.
File Upload and Download: Supports uploading and downloading files (e.g., PDF invoices).
Secure Authentication: Utilizes JWT for secure user authentication.
Technologies Used
Frontend:
React: JavaScript library for building user interfaces.
React-Bootstrap: A UI library for building responsive and styled components.
Redux: For state management.
i18next: For internationalization support.
Axios: For making API requests.
Backend:
Spring Boot: Java framework for building the backend.
Spring Security: For handling authentication and authorization.
JWT: JSON Web Tokens for secure user authentication.
JPA/Hibernate: For ORM-based data access.
MySQL: Database for storing user and order data.

How to Run the Project:
Prerequisites
1.Node.js (v16 or higher)
2.Java (v11 or higher)
3.Maven for building the backend

Steps to Run the Backend

1.Clone the repository:

bash:
git clone https://github.com/MRMIYAGIII/FoodOrderingApp.git
cd FoodOrderingApp/backend

2.Install dependencies:

bash:
mvn install

3.Run the backend server:

bash:
mvn spring-boot:run

The backend will run on http://localhost:8080.




Steps to Run the Frontend
Navigate to the frontend directory:

bash:
cd ../frontend
Install dependencies:

bash:
npm install
Start the React development server:

bash:
npm start
The frontend will be accessible at http://localhost:3000.

API Endpoints
The backend provides the following endpoints:

POST /api/auth/login: Login with credentials.
POST /api/auth/register: Register a new user.
GET /api/restaurants: Get a list of all restaurants.
GET /api/foods: Get a list of food items.
POST /api/orders: Place a new order.
GET /api/orders/{id}: Get details of an order by ID.
POST /api/cart: Add an item to the cart.


Contact
For any issues or contributions, feel free to open an issue or send a pull request. You can also reach me at: pmugabo23@gmail.com.