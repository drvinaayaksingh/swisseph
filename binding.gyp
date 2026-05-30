{
  'variables': {
    'clang': 0,
  },
  'targets': [
    {
      'target_name': 'swisseph',
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
      'msvs_settings': {
        'VCCLCompilerTool': {
          'AdditionalOptions': [
            '/std:c++20',
          ],
        },
      },
      'sources': [
        'src/util.cc',
        'src/date.cc',
        'src/swisseph.cc',
        'src/callback.cc',
        'src/pos.cc',
        'src/hel.cc',
        'src/house.cc',
        'src/eclipse.cc'
      ],
      'dependencies': [
      	'deps/swisseph/swisseph.gyp:swissephz'
      ],
      "include_dirs": ["<!(node -e \"require('nan')\")"]
    }
  ]
}
