import { getInstance } from '@/plugins/auth0.js'

export const authGuard = (to, from, next) => {
  const authService = getInstance()

  const fn = () => {
    // If the user is authenticated, continue with the route
    if (authService.isAuthenticated) {
      return next()
    }

    // Otherwise, log in
    authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  }

  // If loading has already finished, check our auth state using `fn()`
  if (!authService.isLoading) {
    return fn()
  }

  // Watch for the loading property to change before we check isAuthenticated
  authService.$watch('isLoading', isLoading => {
    if (isLoading === false) {
      return fn()
    }
  })
}
