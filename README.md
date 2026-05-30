# 🪐 Node.js Wrapper for Swiss Ephemeris (Swisseph)

## 🪐 About This Project

This project is a **Node.js wrapper for Swiss Ephemeris (Swisseph)** – a high-precision astronomical and astrological calculation engine developed by [Astrodienst](https://www.astro.com). Powered by NASA’s JPL DE data, Swiss Ephemeris delivers extremely accurate planetary positions, house systems, nakshatras, tithis, yoga, eclipses, and other essential components for astrology and astronomy applications.

---

## ✨ Why This Exists

The original Swisseph library is written in C and not easily accessible from JavaScript or Node.js-based environments. This lightweight and efficient Node wrapper bridges that gap, allowing **JavaScript developers, astrologers, and researchers** to integrate Swiss Ephemeris directly into **web apps, APIs, and astrology tools**.

---

## 🔧 Features

- 🔭 Accurate planetary position calculations  
- ♈ Support for sidereal and tropical zodiacs  
- 🌙 Nakshatra, Tithi, Yoga, Karana, Sunrise/Sunset, and Ayanamsa  
- 🕒 Timezone, UTC, Julian Day conversions  
- ⚙️ Easy-to-use Promise/Async API for Node.js  
- 🧱 Works with modern frameworks like Express, NestJS, etc.

---

## 📦 Ideal For

- 🧘 Vedic Astrology APIs  
- 📅 Panchang generators  
- 🔔 Muhurat finders  
- 🧑‍💻 Horoscope calculators  
- 🔬 Astronomy research tools

---

> Want to contribute or customize it for your astrology platform? Pull requests and stars are always welcome!


===================================

## Overview

This project is an updated version of the swisseph library, originally designed to provide Swiss Ephemeris calculations for Node.js applications. The Swiss Ephemeris is a highly precise ephemeris developed by Astrodienst AG, used for astrological calculations.

The original swisseph project made the power of the Swiss Ephemeris accessible to Node.js developers but was not maintained for compatibility with the latest versions of Node.js. This fork aims to update the library, ensuring it works seamlessly with the most recent Node.js and npm versions, thereby extending its utility to the current development environment.

This work builds upon the original swisseph project. I am deeply grateful to author for their pioneering work on making the Swiss Ephemeris accessible to the Node.js community. This updated version stands as a testament to the foundational work laid by the original author(s).

See [Swiss Ephemeris](http://www.astro.com/swisseph/swephinfo_e.htm) for more details.

Visit our website: [shilaavinyaas](https://shilaavinyaas.com/) which uses this library for calculations.

Supported platforms: **Mac OS X** | **Windows** | **Linux** | **FreeBSD**

## Getting started

To install run:

```bash
$ npm install swisseph-v2
```

## Requirements & Compatibility

- **Node.js**: Requires `node >= 16.0.0` (fully tested, updated, and compatible up to **Node.js v24**).
- **Windows Builds**: Automatically configures and compiles native addons using standard Visual Studio MSVC compilers (e.g. Visual Studio 2022 / `v143` toolset). No complex global or manual `ClangCL` configuration is required.
- **macOS / Linux / FreeBSD**: Standard developer tools (`clang` / `gcc`) are supported.
- All original Swiss Ephemeris functionality is preserved and fully accessible in modern Node.js environments.


## Usage

The library supports both standard **JavaScript (CommonJS)** and **TypeScript / ES6 Modules**.

### 1. JavaScript (CommonJS)

```javascript
const swisseph = require('swisseph-v2');

// Configure ephemeris data path
swisseph.swe_set_ephe_path(__dirname + '/ephe');

// Calculate Julian Day for a UT date (e.g. 1983-05-31 07:00:00 UT)
const date = { year: 1983, month: 5, day: 31, hour: 7 };
const julday = swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL);
console.log('Julian UT day:', julday); // 2445485.7916666665

// Calculate Sun position
const flags = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;
swisseph.swe_calc_ut(julday, swisseph.SE_SUN, flags, function (body) {
	if (body.error) {
		console.error('Error:', body.error);
	} else {
		console.log('Sun position:', body);
	}
});
```

### 2. TypeScript / ES6 Modules

When using TypeScript, make sure you have `"esModuleInterop": true` enabled in your `tsconfig.json` compiler options. This allows standard default imports:

```typescript
import swisseph from 'swisseph-v2';

// Calculate Julian day and get Sun position
const date = { year: 1983, month: 5, day: 31, hour: 7 };
const julday = swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL);

const flags = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;
swisseph.swe_calc_ut(julday, swisseph.SE_SUN, flags, (body) => {
    if ('error' in body) {
        console.error('Error:', body.error);
    } else if ('longitude' in body) {
        // TypeScript type narrowing guarantees body has planetary coordinates
        console.log('Sun Longitude:', body.longitude);
        console.log('Sun Latitude:', body.latitude);
    }
});
```

### Getting Sun and Moon position

Here are examples showing how to calculate the Julian Day, Sun, and Moon positions.

#### JavaScript (CommonJS)

```javascript
const assert = require('assert');
const swisseph = require('swisseph-v2');

// Test date
const date = { year: 1983, month: 5, day: 31, hour: 7 };
const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

// Path to ephemeris data
swisseph.swe_set_ephe_path(__dirname + '/../ephe');

// Calculate Julian day
swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, function (julday_ut) {
	assert.equal(julday_ut, 2445485.7916666665);
	console.log('Julian UT day for date:', julday_ut);

	// Get Sun position
	swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, function (body) {
		assert(!body.error, body.error);
		console.log('Sun position:', body);
	});

	// Get Moon position
	swisseph.swe_calc_ut(julday_ut, swisseph.SE_MOON, flag, function (body) {
		assert(!body.error, body.error);
		console.log('Moon position:', body);
	});
});
```

#### TypeScript / ES6 Modules

```typescript
import assert from 'assert';
import swisseph from 'swisseph-v2';

const date = { year: 1983, month: 5, day: 31, hour: 7 };
const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

// Path to ephemeris data
swisseph.swe_set_ephe_path(__dirname + '/../ephe');

// Calculate Julian day
swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, (julday_ut) => {
	assert.equal(julday_ut, 2445485.7916666665);
	console.log('Julian UT day:', julday_ut);

	// Get Sun position
	swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, (body) => {
		if ('error' in body) {
			assert.fail(body.error);
		} else if ('longitude' in body) {
			console.log('Sun position:', body);
		}
	});

	// Get Moon position
	swisseph.swe_calc_ut(julday_ut, swisseph.SE_MOON, flag, (body) => {
		if ('error' in body) {
			assert.fail(body.error);
		} else if ('longitude' in body) {
			console.log('Moon position:', body);
		}
	});
});
```

For more examples see *examples* and *test* folders.

### Using ecliptic, equatorial or rectangular coordinates

On computing planet, star, node or apside positions, and [using SEFLG_EQUATORIAL or SEFLG_XYZ in flag bits](http://www.astro.com/swisseph/swephprg.htm#_Toc433200761), name of the resulting property will be different from the case with ecliptic coordinates. Run *examples/issue-23.js* in details, please.

### Ephemeris settings

There are 3 different types of ephemeris supported:

- *Steve Moshier* interpolation, covers 3000 BC – 3000 AD, preision 0.1 arcsec, no data files required.
- *Swiss Ephemeris* is compressed version of DE431, covers 13000 BC - 17000 AD, precision 0.001 arcseconds, requires data files about 90MB. Download from [ftp://www.astro.com/pub/swisseph/ephe](ftp://www.astro.com/pub/swisseph/ephe).
- JPL NASA ephemeris is the state of the art ephemeris, DE431 covers 13000 BC - 17000 AD, maximum possible precision, requires data files 2.9GB. Download from [ftp://www.astro.com/pub/jplfiles](ftp://www.astro.com/pub/jplfiles).

To use data files download them and put in folder then set path to the ephemeris folder by:

```javascript
swisseph.swe_set_ephe_path ('/path/to/downloaded/ephemeris');
```

And select ephemeris by setting the flag:

```javascript

// for Moshier
body = swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH)

// for Swiss Ephemeris
body = swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, swisseph.SEFLG_SPEED | swisseph.SEFLG_SWIEPH)

// for JPL NASA ephemeris
body = swisseph.swe_calc_ut (julday_ut, swisseph.SE_SUN, swisseph.SEFLG_SPEED | swisseph.SEFLG_JPLEPH)

```

## Tests

To execute tests run from the root folder:

> npm test

## Documentation

See [Programming interface](http://www.astro.com/swisseph/swephprg.htm) to the Swiss Ephemeris for more details.

This javascript programming interface is little different from the original api, basically for return values.
For more details see src/*.h.

## Feedback

Please feel free to fill [issues](http://github.com/drvinaayaksingh/swisseph/issues) for bugs, erros and features.

## License

The license for this project is the same as original [Swiss Ephemeris](http://www.astro.com/swisseph/swephinfo_e.htm).
