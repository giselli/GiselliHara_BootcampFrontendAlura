import websitePageHOC from '../../src/components/wrappers/WebsitePage/hoc';
import { authService } from '../../src/service/auth/authService';
import { userService } from '../../src/service/user/userService';
import ProfileScreen from '../../src/components/screens/app/ProfileScreen';

export async function getServerSideProps(ctx) {
  const auth = authService(ctx);

  const hasActiveSession = await auth.hasActiveSession();

  if (hasActiveSession) {
    const session = await auth.getSession();
    const profilePage = await userService.getProfilePage(ctx);
    const githubInfos = await userService.githubInfos(session.username);
    return {
      props: {
        userContext: {
          user: {
            ...session,
            ...profilePage.user,
          },
          posts: profilePage.posts,
          gitInfo: {
            ...githubInfos,
          },
        },
      },
    };
  }
  ctx.res.writeHead(307, { location: '/login' });
  return ctx.res.end();
}

export default websitePageHOC(ProfileScreen, {
  pageWrapperProps: {
    seoProps: {
      headTitle: 'Profile',
    },
    menuProps: {
      display: true,
      variant: 'logged',
    },
    pageBoxProps: {
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'bottom right',
    },
  },
});
