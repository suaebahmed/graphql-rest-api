import React,{useState} from 'react'

function Auth() {
    const [user, setUser] = useState({email:'',password: ''});

    const submitHandle= async()=>{
        //you must have valide request body..
        const requestBody = {
            query: `
            mutation{
                createUser(email: "${user.email}",password: "${user.password}"){
                  _id
                  email
                }
              }
            `
        }

        try {
            let res = await fetch('http://localhost:5000/app',{
                method:'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="row mx-auto">
            <div className="col-md-6">
                <input className="form-control" placeholder="Enter email" 
                onChange={(e)=>{setUser({...user,email: e.target.value})}} 
                />
            </div>
            <div className="col-md-6">
                <input className="form-control" placeholder="Enter password"
                onChange={(e)=>{setUser({...user,password: e.target.value})}}
                />
            </div>
            <input type="submit" value="submit" onClick={submitHandle}/>
        </div>
    )
}

export default Auth;
