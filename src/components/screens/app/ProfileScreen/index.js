import React, { useContext } from 'react';
import InforCard from '../../../commons/Card/InforCard';
import { Box } from '../../../foundation/layout/Box';
import { Grid } from '../../../foundation/layout/Grid';
import { WebsitePageContext } from '../../../wrappers/WebsitePage';

export default function ProfileScreen() {
  const websiteUserInfos = useContext(WebsitePageContext);
  const { gitInfo } = websiteUserInfos.userContext;
  const { user } = websiteUserInfos.userContext;
  const { posts } = websiteUserInfos.userContext;
  return (
    <Box logged>
      <Grid.Container
        marginTop={{
          xs: '32px',
          md: '60px',
        }}
      >
        <InforCard
          userPhoto={gitInfo.avatar_url}
          userName={user.username}
          userBio={gitInfo.bio}
          following={gitInfo.following}
          followers={gitInfo.followers}
          postLength={posts.length}
        />

        <Grid.Row justifyContent="center">
          <Grid.Col
            value={{ xs: 12, md: 10, xl: 9 }}
            display="flex"
            justifyContent="center"
            flexWrap="wrap"
          >
            {posts.map((i) => (
              // eslint-disable-next-line no-underscore-dangle
              <Box width="30%" margin="1.5%" display="flex" key={i._id}>
                <img src={i.photoUrl} className={`${i.filter} filter-${i.filter}`} alt={i.description} style={{ width: '100%', overflowWrap: 'break-word' }} />
              </Box>
            )).reverse().slice(0, 100)}

          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </Box>
  );
}
