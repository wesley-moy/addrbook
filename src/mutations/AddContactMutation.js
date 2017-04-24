/* @flow */
/* eslint class-methods-use-this: "off" */

import Relay from 'react-relay';

export default class AddContactMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation{ addContact }`;
  }

  getVariables() {
    return {
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on AddContactPayload @relay(pattern: true) {
        viewer {
          contacts {
            edges {
              node {
                id
                firstName
                lastName
                email
              }
            }
          }
        }
        newContactEdge
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'contacts',
      edgeName: 'newContactEdge',
      rangeBehaviors: {
        '': 'append',
        'orederby(oldes)': 'prepend',
      },
    }];
  }

  /**
  * data dependencies for the mutation (becomes available via props)
  * must also be passed on initialization, from parent container
  */
 static fragments = {
   viewer: () => Relay.QL`
     fragment on Viewer {
       id,
     }
   `,
 };

  getOptimisticResponse() {
    return {
      viewer: this.props.viewer,
      newContactEdge: {
        node: {
          firstName: this.props.firstName,
          lastName: this.props.lastName,
          email: this.props.email,
        }
      },
    };
  }
}
