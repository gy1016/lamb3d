import { Ellipsoid } from '../../src/geographic';

describe('Ellipsoid', function () {
  it('Customize ellipsoid', () => {
    let ellipsoid = new Ellipsoid(9, 9, 9);
    expect(ellipsoid.radii.x).toBe(9);
    expect(ellipsoid.radii.y).toBe(9);
    expect(ellipsoid.radii.z).toBe(9);
    expect(ellipsoid.radiiSquared.x).toBe(81);
    expect(ellipsoid.oneOverRadiiSquared.x).toBe(1 / 81);
  });

  it('Wgs84 ellipsoid', () => {
    expect(Ellipsoid.Wgs84.radii.x).toBe(6378137.0);
    expect(Ellipsoid.Wgs84.radii.y).toBe(6378137.0);
    expect(Ellipsoid.Wgs84.radii.z).toBe(6356752.314245);
  });

  it('ScaledWgs84 ellipsoid', () => {
    expect(Ellipsoid.ScaledWgs84.radii.x).toBe(1.0);
    expect(Ellipsoid.ScaledWgs84.radii.y).toBe(1.0);
    expect(Ellipsoid.ScaledWgs84.radii.z).toBe(6356752.314245 / 6378137.0);
  });

  it('UnitSphere ellipsoid', () => {
    expect(Ellipsoid.UnitSphere.radii.x).toBe(1.0);
    expect(Ellipsoid.UnitSphere.radii.y).toBe(1.0);
    expect(Ellipsoid.UnitSphere.radii.z).toBe(1.0);
  });
});
