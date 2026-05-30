import assert from 'assert';
import swisseph from '../lib/swisseph';

const version: string = swisseph.swe_version();
console.log('Swiss Ephemeris version (TS):', version);

// Test date
const date = { year: 1983, month: 5, day: 31, hour: 7 };
console.log('Test date (TS):', date);

const flag = swisseph.SEFLG_SPEED | swisseph.SEFLG_MOSEPH;

// path to ephemeris data
swisseph.swe_set_ephe_path(__dirname + '/../ephe');

// Julian day
swisseph.swe_julday(date.year, date.month, date.day, date.hour, swisseph.SE_GREG_CAL, (julday_ut: number) => {
    assert.equal(julday_ut, 2445485.7916666665);
    console.log('Julian UT day for date (TS):', julday_ut);

    // Date conversion
    swisseph.swe_date_conversion(date.year, date.month, date.day, date.hour, 'g', (result) => {
        if ('error' in result) {
            assert.fail(result.error);
        } else {
            assert.equal(julday_ut, result.julianDay);
            console.log('Julian UT day for date (TS) from conversion:', result.julianDay);
        }
    });

    // Reverse date conversion
    swisseph.swe_revjul(julday_ut, swisseph.SE_GREG_CAL, (result) => {
        assert.equal(date.year, result.year);
        assert.equal(date.month, result.month);
        assert.equal(date.day, result.day);
        assert.ok(Math.abs(date.hour - result.hour) < 1e-6, `Expected hour close to ${date.hour}, got ${result.hour}`);
        console.log('Date from Julian UT day (TS):', result);
    });

    // Sun position
    swisseph.swe_calc_ut(julday_ut, swisseph.SE_SUN, flag, (body) => {
        if ('error' in body) {
            assert.fail(body.error);
        } else if ('longitude' in body) {
            assert.ok(body.longitude > 0);
            console.log('Sun position (TS):', body);
        } else {
            assert.fail('Expected longitude in body');
        }
    });

    // Moon position
    swisseph.swe_calc_ut(julday_ut, swisseph.SE_MOON, flag, (body) => {
        if ('error' in body) {
            assert.fail(body.error);
        } else if ('longitude' in body) {
            assert.ok(body.longitude > 0);
            console.log('Moon position (TS):', body);
        } else {
            assert.fail('Expected longitude in body');
        }
    });

    console.log('All TypeScript tests completed successfully!');
});
