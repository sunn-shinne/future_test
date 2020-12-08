import React from "react";

interface props {
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  address: {
    streetAddress: string,
    city: string,
    state: string,
    zip: string,
  },
  description: string,

}

export const Info = (props: props) => {

  return (
    <div className='row border' style={{width: '60%', margin: "30px auto", textAlign: "center", padding: 10}}>
      <div className='col-6'>
        <p>The selected user: <b>{props.firstName} {props.lastName}</b></p>
        <p>Phone: <b>{props.phone}</b></p>
        <p>Email: <b>{props.email}</b></p>
      </div>
      <div className='col-6'>
        <p>Residential address: <b>{props.address.streetAddress}</b></p>
        <p>City: <b>{props.address.city}</b></p>
        <p>Province/state: <b>{props.address.state}</b></p>
        <p>Index: <b>{props.address.zip}</b></p>
      </div>
      <div className='col-12'>
        <p>Description:</p>
        <p>
          {props.description}
        </p>
      </div>
    </div>
  );
}