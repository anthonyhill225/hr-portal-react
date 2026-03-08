import { useState } from "react";
import { getOnboarding, setOnboarding } from "../utils/storage";

function Onboarding() {
  const [items, setItems] = useState(getOnboarding());

  const completeOnboarding = (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, status: "Completed" } : item
    );

    setItems(updated);
    setOnboarding(updated);
  };

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <h1>Employee Onboarding</h1>
        <p>Track and manage onboarding progress for new starters.</p>
      </div>

      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Department</th>
              <th>Start Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.department}</td>
                <td>{item.startDate}</td>
                <td>{item.status}</td>
                <td>
                  {item.status === "Pending" ? (
                    <button
                      className="approve-btn"
                      onClick={() => completeOnboarding(item.id)}
                    >
                      Mark Complete
                    </button>
                  ) : (
                    <span className="completed-text">Completed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Onboarding;