{
  'variables': {
    'clang': 0,
  },
  'targets': [
    {
      'target_name': 'swissephz',
      'type': 'static_library',
      'variables': {
        'clang': 0,
      },
      'configurations': {
        'Debug': {
          'msbuild_toolset': 'v143',
        },
        'Release': {
          'msbuild_toolset': 'v143',
        },
      },
      'direct_dependent_settings': {
        'include_dirs': ['.']
      },
      'sources': [
        'swecl.c',
        'swedate.c',
        'swehel.c',
        'swehouse.c',
        'swejpl.c',
        'swemmoon.c',
        'swemplan.c',
        'sweph.c',
        'swephlib.c'
      ]
    }
  ]
}