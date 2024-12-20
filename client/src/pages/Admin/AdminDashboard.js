import React from "react";
import Layouts from "../../components/layout/Layouts";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../components/context/auth";
function AdminDashboard() {
  const [auth] = useAuth();
  return (
    <div>
      <Layouts title="Admin dashboard">
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-50 p-3">
                <h4>Admin Name : {auth?.user?.name}</h4>
                <h4>Admin email : {auth?.user?.email}</h4>
                <h4>Admin phone : {auth?.user?.phone}</h4>
              </div>
            </div>
          </div>
        </div>
      </Layouts>
    </div>
  );
}

export default AdminDashboard;
