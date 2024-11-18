# Documentation for the Project

## **Overview**

This project is a React application designed to manage and display a list of items, allowing users to perform operations such as deleting items, revealing deleted items, and refreshing the list. It incorporates **React Query** for data fetching and state management, **Zustand** for global state handling, and a modular approach to hooks and components for maintainability.

---

## **Features**

### **Data Management**
- Fetch data from a mock API with simulated delays and error handling.
- Optimistic updates to ensure a responsive user experience during mutations.
- Refetch functionality for retrieving the latest data from the server.

### **Card Operations**
- **Delete Cards:** Users can delete cards from the main list, which moves them to a separate "Deleted Cards" list.
- **Reveal/Hide Deleted Cards:** Toggle the visibility of the deleted cards.
- **Revert Deleted Cards:** Move deleted cards back to the main list.

### **State Management**
- **Visible Cards:** Derived dynamically from the fetched data based on specific filters (e.g., visibility status).
- **Deleted Cards:** Managed globally via a Zustand store to ensure state consistency across components.

### **Error Handling**
- Handles errors gracefully during data fetching and mutations, with clear feedback to the user.
- Ensures data consistency by rolling back to the previous state when operations fail.

### **UI/UX Enhancements**
- Loading spinners provide feedback during data fetch operations.
- Toggle buttons allow users to perform quick actions like refreshing data or revealing/hiding deleted cards.
- Modular components like `Card` and `ToggleButton` ensure reusability and easy customization.

---

## **Core Concepts**

### **Data Fetching**
- The project uses **React Query** to fetch and cache data. Query results are filtered to dynamically derive visible items based on their properties.

### **Mutation Handling**
- Mutations (e.g., delete operations) are handled optimistically, updating the UI immediately and ensuring a seamless experience. 
- In case of errors, state reverts to the last known good state.

### **State Persistence**
- The state of deleted cards is maintained separately from the fetched data, ensuring they are not lost during refresh operations or when toggling visibility.

### **Modular Hook Design**
- Custom hooks encapsulate reusable logic, such as fetching and filtering data or managing toggle states, making the codebase easier to maintain and extend.

### **Error and Loading States**
- Error states are logged and displayed using simple indicators to inform users of any issues.
- Loading states ensure that the user knows when data is being fetched or operations are in progress.

---

## **User Flow**

1. **Viewing Cards**
   - On initial load, the app fetches a list of cards and displays only the visible ones.

2. **Deleting a Card**
   - When a user deletes a card, it is immediately removed from the main list and added to the deleted list.
   - If the deletion fails, the card reappears in the main list.

3. **Managing Deleted Cards**
   - Users can toggle the visibility of the deleted list using a "Reveal/Hide" button.
   - Deleted cards can be reverted to the main list with a single action.

4. **Refreshing Data**
   - Users can refresh the main list to fetch the latest data while ensuring deleted cards remain unaffected.

---

## **Error Scenarios**

### **Fetch Errors**
- Simulated with a random failure threshold, triggering an error message and retaining the current list.

### **Mutation Errors**
- If a delete operation fails, the card is restored to the main list, ensuring no data is lost.

---

## **Performance Considerations**

1. **Optimistic Updates**
   - Minimizes delays between user actions and UI updates, improving perceived performance.

2. **Efficient State Derivation**
   - Filters and transformations are applied only to the relevant data, avoiding unnecessary computations.

3. **Caching**
   - React Query caches data to prevent redundant network requests and improve responsiveness.

---

## **Testing**

### **Should You Test These Features?**
Testing these features is highly recommended, as they include user-critical functionality, such as fetching, deleting, and managing cards. Tests would ensure that these operations behave as expected under different scenarios, including edge cases and failure states. 

### **How to Approach Testing**
1. **Unit Tests**
   - Test individual functions and hooks (e.g., `fetchListData`, `useDeleteCard`) to ensure they perform as expected.
   - Mock API responses to simulate various scenarios like successful fetches, errors, and optimistic updates.

2. **Integration Tests**
   - Test the interactions between components, hooks, and stores.
   - Validate that deleting a card updates both the visible list and the deleted list correctly.

3. **End-to-End (E2E) Tests**
   - Simulate user flows, such as deleting a card, refreshing the list, and reverting deleted cards.
   - Ensure the UI responds correctly and shows accurate feedback.

4. **Error Scenarios**
   - Test how the app behaves when errors occur during fetching or mutations.
   - Validate that optimistic updates rollback correctly in case of failures.

Even without a testing framework currently installed, documenting potential edge cases and how features should behave will guide future testing efforts and improve confidence in the system's reliability.

---

## **Best Practices**

1. **Separation of Concerns**
   - State management, business logic, and UI components are modularized for better maintainability.

2. **Error Resilience**
   - Comprehensive error handling ensures the application remains functional even during failures.

3. **Reusable Components**
   - Components like `Card` and `ToggleButton` follow single-responsibility principles, making them reusable in different contexts.

---

## **Future Improvements**

1. **Pagination**
   - Introduce pagination or infinite scrolling for large datasets.

2. **Undo Functionality**
   - Allow users to undo delete operations for a limited time.

3. **Server Integration**
   - Replace mock API with a real backend, supporting persistent state and data synchronization.

4. **Testing Framework**
   - Install a testing library (e.g., Jest, React Testing Library, or Cypress) to validate the above recommendations.
