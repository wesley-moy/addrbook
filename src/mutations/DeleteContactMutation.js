import Relay from 'react-relay';

export default class DeleteContactMutation extends Relay.Mutation {
  /**
   * Relay sends this mutation to the GraphQL server
   */
  getMutation() {
    console.log("getting mutation");
    // deleteAll is what the GraphQL mutation is called in /data/mutations/item
    return Relay.QL`mutation { deleteOne }`;
  }

  /**
   * the mutation args come from the object passed upon instantiation;
   * they can be accessed in this class from props;
   * they must also match the 'inputFields' as defined in the GraphQL
   * mutation ('/data/mutations/item.js')
   */
  getVariables() {
    console.log("getting variables");
    return {
      contactId: this.props.contactId,
    };
  }

  /**
   * this describes the payload returned by 'outputFields' from the GraphQL
   * mutation;
   * the payload should include all parts of the data tree that could be
   * affected by this mutation;
   *
   * We never have to worry about over-fetching data from the server. The
   * fat query gets intersected with the tracked query before a minimal
   * request is sent to the server.
   */
  getFatQuery() {
    console.log("getting fatQuery");
    return Relay.QL`
      fragment on DeleteOnePayload @relay(pattern: true) {
        viewer {
          contacts {
            edges {
              node {
                id,
                firstName,
                lastName,
                email,
              }
            }
          }
        },
        contactId,
      }
    `;
  }

  /**
   * depending on the mutation, you'll need different config types;
   * look up config types and args at <https://facebook.github.io/relay/docs/guides-mutations.html#mutator-configuration>
   */
  getConfigs() {
    console.log("getConfigs");
    return [{
      type: 'NODE_DELETE',
      parentName: 'viewer',
      parentID: this.props.viewer.id,
      connectionName: 'contacts',
      deletedIDFieldName: 'contactId',
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

  /**
   * optional method to mimic the expected payload while waiting for
   * the actual payload from the server; makes the app appear very fast on
   * the client side
   */
  getOptimisticResponse() {
    console.log('getting optimistic response');
    return {
      viewer: this.props.viewer,
      contactId: this.props.contactId,
    };
  }
}
