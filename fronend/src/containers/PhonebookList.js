import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { loadmoreUser, loadUser, removeUser, resendUser } from "../actions/users";
import PhonebookItem from "../components/PhonebookItem"

export default function PhonebookList() {

    const users = useSelector((state) => state.phoneBook.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadUser())
    }, [dispatch])

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            dispatch(loadmoreUser())
        }
    }
    return (
        <div className="col" onScroll={scrolling} style={{ overflowY: 'scroll', height: 200 }}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <PhonebookItem
                            key={user.id + 1}
                            no={index + 1}
                            user={user}
                            remove={() => dispatch(removeUser(user.id))}
                            resend={() => dispatch(resendUser(user.id, user.name, user.phone))}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}