import './UserProfile'
export default function Profile() {

    return (
        <div>
                <div>
                    <img src="logo" alt="Rebirth Logo" />
                    <h2 className="pageMessage">Rebirth Job Portal</h2>
                </div>

            <div className="profileInfo"> 
                <h3>Profile</h3>
                <img className="profileImage"src="" alt="" />
                <h4>Name </h4>
                <h4>Company Name</h4>
                <h4>Location</h4>
                <button className="editAccount">Edit Account</button>
            </div>


            
        </div>


    )
}
