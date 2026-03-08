import usersData from "../data/users.json";
import employeesData from "../data/employees.json";
import leaveRequestsData from "../data/leaveRequests.json";
import onboardingData from "../data/onboarding.json";

export const initializeStorage = () => {
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(usersData));
  }

  if (!localStorage.getItem("employees")) {
    localStorage.setItem("employees", JSON.stringify(employeesData));
  }

  if (!localStorage.getItem("leaveRequests")) {
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequestsData));
  }

  if (!localStorage.getItem("onboarding")) {
    localStorage.setItem("onboarding", JSON.stringify(onboardingData));
  }

  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(null));
  }
};

export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];
export const setUsers = (users) =>
  localStorage.setItem("users", JSON.stringify(users));

export const getEmployees = () =>
  JSON.parse(localStorage.getItem("employees")) || [];
export const setEmployees = (employees) =>
  localStorage.setItem("employees", JSON.stringify(employees));

export const getLeaveRequests = () =>
  JSON.parse(localStorage.getItem("leaveRequests")) || [];
export const setLeaveRequests = (requests) =>
  localStorage.setItem("leaveRequests", JSON.stringify(requests));

export const getOnboarding = () =>
  JSON.parse(localStorage.getItem("onboarding")) || [];
export const setOnboarding = (data) =>
  localStorage.setItem("onboarding", JSON.stringify(data));

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("currentUser"));

export const setCurrentUser = (user) =>
  localStorage.setItem("currentUser", JSON.stringify(user));

export const logoutUser = () =>
  localStorage.setItem("currentUser", JSON.stringify(null));