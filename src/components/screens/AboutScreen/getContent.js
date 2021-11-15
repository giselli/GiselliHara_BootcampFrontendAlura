import { CMSGraphQlClient, gql } from '../../../infra/cms/CMSGraphQlClient';

export async function getContent({ preview }) {
  const query = gql`
    query {
      pageSobre {
        pageTitle
        pageDescription
      }
    }
  `;
  const client = CMSGraphQlClient({ preview });
  const response = await client.query({ query });

  return response.data.messages;
}
