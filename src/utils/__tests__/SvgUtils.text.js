import SvgUtils from '../SvgUtils';

describe('svgPosToPagePos', () => {
  test('null', () => {
    const { x, y } = SvgUtils.svgPosToPagePos();

    expect(x).toEqual(0);
    expect(y).toEqual(0);
  });

  test('x', () => {
    const svgPos = { x: 100, y: 0 };
    const svgTransformMatrix = [1, 0, 0, 1, 0, 0];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(100);
    expect(y).toEqual(0);
  });

  test('x scale', () => {
    const svgPos = { x: 100, y: 0 };
    const svgTransformMatrix = [0.5, 0, 0, 1, 0, 0];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(50);
    expect(y).toEqual(0);
  });

  test('x shift', () => {
    const svgPos = { x: 100, y: 0 };
    const svgTransformMatrix = [1, 0, 0, 1, 33, 0];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(133);
    expect(y).toEqual(0);
  });

  test('x multi', () => {
    const svgPos = { x: 100, y: 0 };
    const svgTransformMatrix = [0.5, 0, 0, 1, 33, 0];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(83);
    expect(y).toEqual(0);
  });

  test('y', () => {
    const svgPos = { x: 100, y: 0 };
    const svgTransformMatrix = [1, 0, 0, 1, 0, 0];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(100);
    expect(y).toEqual(0);
  });

  test('y scale', () => {
    const svgPos = { x: 0, y: 100 };
    const svgTransformMatrix = [1, 0, 0, 0.5, 0, 0];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(0);
    expect(y).toEqual(50);
  });

  test('y shift', () => {
    const svgPos = { x: 0, y: 100 };
    const svgTransformMatrix = [1, 0, 0, 1, 0, 33];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(0);
    expect(y).toEqual(133);
  });

  test('y multi', () => {
    const svgPos = { x: 0, y: 100 };
    const svgTransformMatrix = [0, 0, 0, 0.5, 0, 33];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(0);
    expect(y).toEqual(83);
  });

  test('x y multi', () => {
    const svgPos = { x: 1000, y: 100 };
    const svgTransformMatrix = [0.4, 0, 0, 0.5, 77, 33];

    const { x, y } = SvgUtils.svgPosToPagePos(svgPos, svgTransformMatrix);

    expect(x).toEqual(477);
    expect(y).toEqual(83);
  });
});

