module.exports = {
    ci: {
      upload: {
        target: 'temporary-public-storage', //lokacija spremanja rezultata, rezultate moguce spremiti i na server
      },
      assert: {
        preset: 'lighthouse:no-pwa',
        assertions: {
          'csp-xss': 'warn',
          'bf-cache': 'warn',
          'categories:performance': ['error', { minScore: 0.85 }],
          'categories:accessibility': ['error', { minScore: 0.85 }],
          'categories:best-practices': ['error', { minScore: 0.85 }],
          'categories:seo': ['error', { minScore: 0.75 }],
        },
      },
    },
  };