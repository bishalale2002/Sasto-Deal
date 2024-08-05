import React from "react";
import Layouts from "../../components/layout/Layouts";
import UserMenu from "../../components/layout/UserMenu";

function Profile() {
  return (
    <div>
      <Layouts>
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>

          <div className="col-md-9">Profile</div>
        </div>
      </Layouts>
    </div>
  );
}

export default Profile;