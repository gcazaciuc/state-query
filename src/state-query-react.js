/*
* Usage
* 1. As decorator
* const getAllUsers =  (props) => query(
                            select('*'), from('users')
                        );
* const getUIState =  (props) => query(
                            select('*'), from(`users_list_ui`)
                       );
* const deleteUser = (userId) => mutation(
                        delete(), table('users'), where( cond(col('id'), eq(), userId) )
                     );
*
* @component({
*    users:  getAllUsers,
     ui: getUIState,
     deleteUser
* })
* class UsersList extends React.Component {
     onDeleteUser(ev) {
        this.props.deleteUser(ev.data.id);
     }
     render() {
        <ul>{
            this.props.users.map((usr) => (<li>{usr.name}</li>))
        }
        </ul>
     }
  }
*/
export const component = (config) => (Comp) => {
    return class StateQueryReact extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }
        render() {
            return (<Comp {...props} {...this.state} />);
        }
    }
};

