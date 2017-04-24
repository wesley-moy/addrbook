/* @flow */
/* eslint class-methods-use-this: "off" */

import Relay from 'react-relay';

export default class UpdateContactMutation extends Relay.Mutation {

  getMutation() {
    return Relay.QL`mutation{ updateContact }`;
  }

  getVariables() {
    return {
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateContactPayload {
        contact {
          firstName,
          lastName,
          email,
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        contact: this.props.id
      },
    }];
  }

  static fragments = {
  contact: () => Relay.QL`
    fragment on Contact {
      id,
    }
  `,
  };

  getOptimisticResponse() {
   return {
     contact: {
       firstName: this.props.firstName,
       lastName: this.props.lastName,
       email: this.props.email,
     }
   }
  }

}
