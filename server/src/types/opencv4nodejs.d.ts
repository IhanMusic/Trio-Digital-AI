declare module 'opencv4nodejs' {
  export class Mat {
    rows: number;
    cols: number;
    type: number;
    channels(): number;
    empty(): boolean;
    at(row: number, col: number): number;
    atRaw(row: number, col: number): any;
    set(row: number, col: number, value: number | number[]): void;
    getData(): Buffer;
    getDataAsArray(): number[][];
    copyTo(dst: Mat): Mat;
    convertTo(type: number): Mat;
    add(value: Mat | number[]): Mat;
    sub(value: Mat | number[]): Mat;
    mul(value: Mat | number[]): Mat;
    div(value: Mat | number[]): Mat;
    and(value: Mat | number[]): Mat;
    or(value: Mat | number[]): Mat;
    bitwiseAnd(value: Mat | number[]): Mat;
    bitwiseOr(value: Mat | number[]): Mat;
    bitwiseXor(value: Mat | number[]): Mat;
    bitwiseNot(): Mat;
    abs(): Mat;
    determinant(): number;
    dot(value: Mat): number;
    mean(): number[];
    meanStdDev(): { mean: Mat; stddev: Mat };
    normalize(alpha?: number, beta?: number, normType?: number): Mat;
    split(): Mat[];
    merge(mats: Mat[]): Mat;
    reshape(cn: number, rows?: number): Mat;
    resize(rows: number, cols: number): Mat;
    resize(dsize: Size, fx?: number, fy?: number, interpolation?: number): Mat;
    threshold(thresh: number, maxval: number, type: number): Mat;
    adaptiveThreshold(maxValue: number, adaptiveMethod: number, thresholdType: number, blockSize: number, C: number): Mat;
    inRange(lower: Mat | number[], upper: Mat | number[]): Mat;
    cvtColor(code: number, dstCn?: number): Mat;
    bgrToGray(): Mat;
    warpAffine(transforMat: Mat, size: Size): Mat;
    warpPerspective(transforMat: Mat, size: Size): Mat;
    dilate(kernel: Mat, anchor?: Point2, iterations?: number, borderType?: number): Mat;
    erode(kernel: Mat, anchor?: Point2, iterations?: number, borderType?: number): Mat;
    findContours(mode: number, method: number): Contour[];
    drawContours(contours: Contour[], contourIdx: number, color: Vec3, thickness?: number, lineType?: number): Mat;
    drawLine(pt0: Point2, pt1: Point2, color: Vec3, thickness?: number, lineType?: number): Mat;
    drawCircle(center: Point2, radius: number, color: Vec3, thickness?: number, lineType?: number): Mat;
    drawRectangle(pt1: Point2, pt2: Point2, color: Vec3, thickness?: number, lineType?: number): Mat;
    drawEllipse(box: RotatedRect, color: Vec3, thickness?: number, lineType?: number): Mat;
    putText(text: string, org: Point2, fontFace: number, fontScale: number, color: Vec3, thickness?: number, lineType?: number): Mat;
    matchTemplate(template: Mat, method: number): Mat;
    canny(threshold1: number, threshold2: number, apertureSize?: number, L2gradient?: boolean): Mat;
    sobel(ddepth: number, dx: number, dy: number, ksize?: number, scale?: number, delta?: number, borderType?: number): Mat;
    gaussianBlur(ksize: Size, sigmaX: number, sigmaY?: number, borderType?: number): Mat;
    houghLines(rho: number, theta: number, threshold: number): Vec2[];
    houghLinesP(rho: number, theta: number, threshold: number, minLineLength?: number, maxLineGap?: number): Vec4[];
    roi(rect: Rect): Mat;
    getRegion(region: Rect): Mat;
    release(): void;
  }

  export class Vec2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
  }

  export class Vec3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
  }

  export class Vec4 {
    w: number;
    x: number;
    y: number;
    z: number;
    constructor(w: number, x: number, y: number, z: number);
  }

  export class Point2 {
    x: number;
    y: number;
    constructor(x: number, y: number);
  }

  export class Point3 {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
  }

  export class Size {
    width: number;
    height: number;
    constructor(width: number, height: number);
  }

  export class Rect {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x: number, y: number, width: number, height: number);
  }

  export class RotatedRect {
    center: Point2;
    size: Size;
    angle: number;
  }

  export class Contour {
    area: number;
    isConvex: boolean;
    numPoints: number;
    hierarchy: number[];
    boundingRect(): Rect;
    minAreaRect(): RotatedRect;
    minEnclosingCircle(): { center: Point2; radius: number };
    moments(): Moments;
    approxPolyDP(epsilon: number, closed: boolean): Contour;
    convexHull(clockwise?: boolean): Contour;
    convexityDefects(hull: Contour): Vec4[];
    matchShapes(contour2: Contour, method: number): number;
  }

  export class Moments {
    m00: number;
    m10: number;
    m01: number;
    m20: number;
    m11: number;
    m02: number;
    m30: number;
    m21: number;
    m12: number;
    m03: number;
    mu20: number;
    mu11: number;
    mu02: number;
    mu30: number;
    mu21: number;
    mu12: number;
    mu03: number;
    nu20: number;
    nu11: number;
    nu02: number;
    nu30: number;
    nu21: number;
    nu12: number;
    nu03: number;
  }

  export class TermCriteria {
    type: number;
    maxCount: number;
    epsilon: number;
    constructor(type: number, maxCount: number, epsilon: number);
  }

  export const CV_8U: number;
  export const CV_8S: number;
  export const CV_16U: number;
  export const CV_16S: number;
  export const CV_32S: number;
  export const CV_32F: number;
  export const CV_64F: number;
  export const CV_8UC1: number;
  export const CV_8UC2: number;
  export const CV_8UC3: number;
  export const CV_8UC4: number;
  export const CV_8SC1: number;
  export const CV_8SC2: number;
  export const CV_8SC3: number;
  export const CV_8SC4: number;
  export const CV_16UC1: number;
  export const CV_16UC2: number;
  export const CV_16UC3: number;
  export const CV_16UC4: number;
  export const CV_16SC1: number;
  export const CV_16SC2: number;
  export const CV_16SC3: number;
  export const CV_16SC4: number;
  export const CV_32SC1: number;
  export const CV_32SC2: number;
  export const CV_32SC3: number;
  export const CV_32SC4: number;
  export const CV_32FC1: number;
  export const CV_32FC2: number;
  export const CV_32FC3: number;
  export const CV_32FC4: number;
  export const CV_64FC1: number;
  export const CV_64FC2: number;
  export const CV_64FC3: number;
  export const CV_64FC4: number;

  export const COLOR_BGR2GRAY: number;
  export const COLOR_BGR2RGB: number;
  export const COLOR_BGR2HSV: number;
  export const COLOR_BGR2Lab: number;
  export const COLOR_RGB2GRAY: number;
  export const COLOR_RGB2BGR: number;
  export const COLOR_RGB2HSV: number;
  export const COLOR_RGB2Lab: number;

  export const THRESH_BINARY: number;
  export const THRESH_BINARY_INV: number;
  export const THRESH_TRUNC: number;
  export const THRESH_TOZERO: number;
  export const THRESH_TOZERO_INV: number;
  export const THRESH_OTSU: number;
  export const THRESH_TRIANGLE: number;

  export const RETR_EXTERNAL: number;
  export const RETR_LIST: number;
  export const RETR_CCOMP: number;
  export const RETR_TREE: number;
  export const RETR_FLOODFILL: number;

  export const CHAIN_APPROX_NONE: number;
  export const CHAIN_APPROX_SIMPLE: number;
  export const CHAIN_APPROX_TC89_L1: number;
  export const CHAIN_APPROX_TC89_KCOS: number;

  export const INTER_NEAREST: number;
  export const INTER_LINEAR: number;
  export const INTER_CUBIC: number;
  export const INTER_AREA: number;
  export const INTER_LANCZOS4: number;

  export const TERM_CRITERIA_COUNT: number;
  export const TERM_CRITERIA_MAX_ITER: number;
  export const TERM_CRITERIA_EPS: number;

  export const GC_INIT_WITH_RECT: number;
  export const GC_INIT_WITH_MASK: number;
  export const GC_EVAL: number;

  export const KMEANS_RANDOM_CENTERS: number;
  export const KMEANS_PP_CENTERS: number;

  export function imread(path: string): Mat;
  export function imreadAsync(path: string): Promise<Mat>;
  export function imwrite(path: string, img: Mat): void;
  export function imwriteAsync(path: string, img: Mat): Promise<void>;
  export function imencode(fileExt: string, img: Mat): Buffer;
  export function imdecode(buffer: Buffer): Mat;

  export function getStructuringElement(shape: number, size: Size, anchor?: Point2): Mat;
  export function getRotationMatrix2D(center: Point2, angle: number, scale: number): Mat;
  export function getPerspectiveTransform(src: Point2[], dst: Point2[]): Mat;
  export function getAffineTransform(src: Point2[], dst: Point2[]): Mat;

  export function kmeans(
    data: Mat,
    k: number,
    bestLabels: Mat,
    criteria: TermCriteria,
    attempts: number,
    flags: number,
    centers?: Mat
  ): number;

  export function grabCut(
    img: Mat,
    mask: Mat,
    rect: Rect,
    bgdModel: Mat,
    fgdModel: Mat,
    iterCount: number,
    mode?: number
  ): void;

  export function watershed(image: Mat, markers: Mat): void;
  export function floodFill(image: Mat, mask: Mat | null, seedPoint: Point2, newVal: number | number[]): number;
}
