/**
 * Common utility methods for math operations.
 */
class MathUtil {
    /** The value for which all absolute numbers smaller than are considered equal to zero. */
    static zeroTolerance = 1e-6;
    /** The conversion factor that radian to degree. */
    static radToDegreeFactor = 180 / Math.PI;
    /** The conversion factor that degree to radian. */
    static degreeToRadFactor = Math.PI / 180;
    /**
     * Clamps the specified value.
     * @param v - The specified value
     * @param min - The min value
     * @param max - The max value
     * @returns The result of clamping a value between min and max
     */
    static clamp(v, min, max) {
        return Math.max(min, Math.min(max, v));
    }
    /**
     * Checks if a and b are almost equals.
     * The absolute value of the difference between a and b is close to zero.
     * @param a - The left value to compare
     * @param b - The right value to compare
     * @returns True if a almost equal to b, false otherwise
     */
    static equals(a, b) {
        return Math.abs(a - b) <= MathUtil.zeroTolerance;
    }
    /**
     * Determines whether the specified v is pow2.
     * @param v - The specified v
     * @returns True if the specified v is pow2, false otherwise
     */
    static isPowerOf2(v) {
        return (v & (v - 1)) === 0;
    }
    /**
     * Modify the specified r from radian to degree.
     * @param r - The specified r
     * @returns The degree value
     */
    static radianToDegree(r) {
        return r * MathUtil.radToDegreeFactor;
    }
    /**
     * Modify the specified d from degree to radian.
     * @param d - The specified d
     * @returns The radian value
     */
    static degreeToRadian(d) {
        return d * MathUtil.degreeToRadFactor;
    }
}

class Vector2 {
    /** @internal */
    static _zero = new Vector2(0.0, 0.0);
    /** @internal */
    static _one = new Vector2(1.0, 1.0);
    /**
     * Determines the sum of two vectors.
     * @param left - The first vector to add
     * @param right - The second vector to add
     * @param out - The sum of two vectors
     */
    static add(left, right, out) {
        out._x = left._x + right._x;
        out._y = left._y + right._y;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the difference between two vectors.
     * @param left - The first vector to subtract
     * @param right - The second vector to subtract
     * @param out - The difference between two vectors
     */
    static subtract(left, right, out) {
        out._x = left._x - right._x;
        out._y = left._y - right._y;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the product of two vectors.
     * @param left - The first vector to multiply
     * @param right - The second vector to multiply
     * @param out - The product of two vectors
     */
    static multiply(left, right, out) {
        out._x = left._x * right._x;
        out._y = left._y * right._y;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the divisor of two vectors.
     * @param left - The first vector to divide
     * @param right - The second vector to divide
     * @param out - The divisor of two vectors
     */
    static divide(left, right, out) {
        out._x = left._x / right._x;
        out._y = left._y / right._y;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the dot product of two vectors.
     * @param left - The first vector to dot
     * @param right - The second vector to dot
     * @returns The dot product of two vectors
     */
    static dot(left, right) {
        return left._x * right._x + left._y * right._y;
    }
    /**
     * Determines the distance of two vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @returns The distance of two vectors
     */
    static distance(left, right) {
        const x = right._x - left._x;
        const y = right._y - left._y;
        return Math.sqrt(x * x + y * y);
    }
    /**
     * Determines the squared distance of two vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @returns The squared distance of two vectors
     */
    static distanceSquared(left, right) {
        const x = right._x - left._x;
        const y = right._y - left._y;
        return x * x + y * y;
    }
    /**
     * Determines whether the specified vectors are equals.
     * @param left - The first vector to compare
     * @param right - The second vector to compare
     * @returns True if the specified vectors are equals, false otherwise
     */
    static equals(left, right) {
        return MathUtil.equals(left._x, right._x) && MathUtil.equals(left._y, right._y);
    }
    /**
     * Performs a linear interpolation between two vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param t - The blend amount where 0 returns left and 1 right
     * @param out - The result of linear blending between two vectors
     */
    static lerp(left, right, t, out) {
        const { _x, _y } = left;
        out._x = _x + (right._x - _x) * t;
        out._y = _y + (right._y - _y) * t;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a vector containing the largest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the largest components of the specified vectors
     */
    static max(left, right, out) {
        out._x = Math.max(left._x, right._x);
        out._y = Math.max(left._y, right._y);
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a vector containing the smallest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the smallest components of the specified vectors
     */
    static min(left, right, out) {
        out._x = Math.min(left._x, right._x);
        out._y = Math.min(left._y, right._y);
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Reverses the direction of a given vector.
     * @param left - The vector to negate
     * @param out - The vector facing in the opposite direction
     */
    static negate(left, out) {
        out._x = -left._x;
        out._y = -left._y;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Converts the vector into a unit vector.
     * @param left - The vector to normalize
     * @param out - The normalized vector
     */
    static normalize(left, out) {
        const { _x, _y } = left;
        let len = Math.sqrt(_x * _x + _y * _y);
        if (len > MathUtil.zeroTolerance) {
            len = 1 / len;
            out._x = _x * len;
            out._y = _y * len;
            out._onValueChanged && out._onValueChanged();
        }
    }
    /**
     * Scale a vector by the given value.
     * @param left - The vector to scale
     * @param s - The amount by which to scale the vector
     * @param out - The scaled vector
     */
    static scale(left, s, out) {
        out._x = left._x * s;
        out._y = left._y * s;
        out._onValueChanged && out._onValueChanged();
    }
    /** @internal */
    _x;
    /** @internal */
    _y;
    /** @internal */
    _onValueChanged = null;
    /**
     * The x component of the vector.
     */
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * The y component of the vector.
     */
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * Constructor of Vector2.
     * @param x - The x component of the vector, default 0
     * @param y - The y component of the vector, default 0
     */
    constructor(x = 0, y = 0) {
        this._x = x;
        this._y = y;
    }
    /**
     * Set the value of this vector.
     * @param x - The x component of the vector
     * @param y - The y component of the vector
     * @returns This vector
     */
    setValue(x, y) {
        this._x = x;
        this._y = y;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Set the value of this vector by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This vector
     */
    setValueByArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the sum of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    add(right) {
        this._x += right._x;
        this._y += right._y;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the difference of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    subtract(right) {
        this._x -= right._x;
        this._y -= right._y;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the product of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    multiply(right) {
        this._x *= right._x;
        this._y *= right._y;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the divisor of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    divide(right) {
        this._x /= right._x;
        this._y /= right._y;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Calculate the length of this vector.
     * @returns The length of this vector
     */
    length() {
        const { _x, _y } = this;
        return Math.sqrt(_x * _x + _y * _y);
    }
    /**
     * Calculate the squared length of this vector.
     * @returns The squared length of this vector
     */
    lengthSquared() {
        const { _x, _y } = this;
        return _x * _x + _y * _y;
    }
    /**
     * Reverses the direction of this vector.
     * @returns This vector
     */
    negate() {
        this._x = -this._x;
        this._y = -this._y;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Converts this vector into a unit vector.
     * @returns This vector
     */
    normalize() {
        Vector2.normalize(this, this);
        return this;
    }
    /**
     * Scale this vector by the given value.
     * @param s - The amount by which to scale the vector
     * @returns This vector
     */
    scale(s) {
        this._x *= s;
        this._y *= s;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Clone the value of this vector to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out, outOffset = 0) {
        out[outOffset] = this._x;
        out[outOffset + 1] = this._y;
    }
    /**
     * Creates a clone of this vector.
     * @returns A clone of this vector
     */
    clone() {
        return new Vector2(this._x, this._y);
    }
    /**
     * Clones this vector to the specified vector.
     * @param out - The specified vector
     * @returns The specified vector
     */
    cloneTo(out) {
        out._x = this._x;
        out._y = this._y;
        out._onValueChanged && out._onValueChanged();
        return out;
    }
}

/**
 * Describes a 3D-vector.
 */
class Vector3 {
    /** @internal */
    static _zero = new Vector3(0.0, 0.0, 0.0);
    /** @internal */
    static _one = new Vector3(1.0, 1.0, 1.0);
    /**
     * Determines the sum of two vectors.
     * @param left - The first vector to add
     * @param right - The second vector to add
     * @param out - The sum of two vectors
     */
    static add(left, right, out) {
        out._x = left._x + right._x;
        out._y = left._y + right._y;
        out._z = left._z + right._z;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the difference between two vectors.
     * @param left - The first vector to subtract
     * @param right - The second vector to subtract
     * @param out - The difference between two vectors
     */
    static subtract(left, right, out) {
        out._x = left._x - right._x;
        out._y = left._y - right._y;
        out._z = left._z - right._z;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the product of two vectors.
     * @param left - The first vector to multiply
     * @param right - The second vector to multiply
     * @param out - The product of two vectors
     */
    static multiply(left, right, out) {
        out._x = left._x * right._x;
        out._y = left._y * right._y;
        out._z = left._z * right._z;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the divisor of two vectors.
     * @param left - The first vector to divide
     * @param right - The second vector to divide
     * @param out - The divisor of two vectors
     */
    static divide(left, right, out) {
        out._x = left._x / right._x;
        out._y = left._y / right._y;
        out._z = left._z / right._z;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the dot product of two vectors.
     * @param left - The first vector to dot
     * @param right - The second vector to dot
     * @returns The dot product of two vectors
     */
    static dot(left, right) {
        return left._x * right._x + left._y * right._y + left._z * right._z;
    }
    /**
     * Determines the cross product of two vectors.
     * @param left - The first vector to cross
     * @param right - The second vector to cross
     * @param out - The cross product of two vectors
     */
    static cross(left, right, out) {
        const ax = left._x;
        const ay = left._y;
        const az = left._z;
        const bx = right._x;
        const by = right._y;
        const bz = right._z;
        out.setValue(ay * bz - az * by, az * bx - ax * bz, ax * by - ay * bx);
    }
    /**
     * Determines the distance of two vectors.
     * @param a - The first vector
     * @param b - The second vector
     * @returns The distance of two vectors
     */
    static distance(a, b) {
        const x = b._x - a._x;
        const y = b._y - a._y;
        const z = b._z - a._z;
        return Math.sqrt(x * x + y * y + z * z);
    }
    /**
     * Determines the squared distance of two vectors.
     * @param a - The first vector
     * @param b - The second vector
     * @returns The squared distance of two vectors
     */
    static distanceSquared(a, b) {
        const x = b._x - a._x;
        const y = b._y - a._y;
        const z = b._z - a._z;
        return x * x + y * y + z * z;
    }
    /**
     * Determines whether the specified vectors are equals.
     * @param left - The first vector to compare
     * @param right - The second vector to compare
     * @returns True if the specified vectors are equals, false otherwise
     */
    static equals(left, right) {
        return (MathUtil.equals(left._x, right._x) && MathUtil.equals(left._y, right._y) && MathUtil.equals(left._z, right._z));
    }
    /**
     * Performs a linear interpolation between two vectors.
     * @param start - The first vector
     * @param end - The second vector
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two vectors
     */
    static lerp(start, end, t, out) {
        const { _x, _y, _z } = start;
        out._x = _x + (end._x - _x) * t;
        out._y = _y + (end._y - _y) * t;
        out._z = _z + (end._z - _z) * t;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a vector containing the largest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the largest components of the specified vectors
     */
    static max(left, right, out) {
        out._x = Math.max(left._x, right._x);
        out._y = Math.max(left._y, right._y);
        out._z = Math.max(left._z, right._z);
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a vector containing the smallest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the smallest components of the specified vectors
     */
    static min(left, right, out) {
        out._x = Math.min(left._x, right._x);
        out._y = Math.min(left._y, right._y);
        out._z = Math.min(left._z, right._z);
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Reverses the direction of a given vector.
     * @param a - The vector to negate
     * @param out - The vector facing in the opposite direction
     */
    static negate(a, out) {
        out._x = -a._x;
        out._y = -a._y;
        out._z = -a._z;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Converts the vector into a unit vector.
     * @param a - The vector to normalize
     * @param out - The normalized vector
     */
    static normalize(a, out) {
        const { _x, _y, _z } = a;
        let len = Math.sqrt(_x * _x + _y * _y + _z * _z);
        if (len > MathUtil.zeroTolerance) {
            len = 1 / len;
            out.setValue(_x * len, _y * len, _z * len);
        }
    }
    /**
     * Scale a vector by the given value.
     * @param a - The vector to scale
     * @param s - The amount by which to scale the vector
     * @param out - The scaled vector
     */
    static scale(a, s, out) {
        out._x = a._x * s;
        out._y = a._y * s;
        out._z = a._z * s;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Performs a normal transformation using the given 4x4 matrix.
     * @remarks
     * A normal transform performs the transformation with the assumption that the w component
     * is zero. This causes the fourth row and fourth column of the matrix to be unused. The
     * end result is a vector that is not translated, but all other transformation properties
     * apply. This is often preferred for normal vectors as normals purely represent direction
     * rather than location because normal vectors should not be translated.
     * @param v - The normal vector to transform
     * @param m - The transform matrix
     * @param out - The transformed normal
     */
    static transformNormal(v, m, out) {
        const { _x, _y, _z } = v;
        const e = m.elements;
        out._x = _x * e[0] + _y * e[4] + _z * e[8];
        out._y = _x * e[1] + _y * e[5] + _z * e[9];
        out._z = _x * e[2] + _y * e[6] + _z * e[10];
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Performs a transformation using the given 4x4 matrix.
     * @param v - The vector to transform
     * @param m - The transform matrix
     * @param out - The transformed vector3
     */
    static transformToVec3(v, m, out) {
        const { _x, _y, _z } = v;
        const e = m.elements;
        out._x = _x * e[0] + _y * e[4] + _z * e[8] + e[12];
        out._y = _x * e[1] + _y * e[5] + _z * e[9] + e[13];
        out._z = _x * e[2] + _y * e[6] + _z * e[10] + e[14];
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Performs a transformation from vector3 to vector4 using the given 4x4 matrix.
     * @param v - The vector to transform
     * @param m - The transform matrix
     * @param out - The transformed vector4
     */
    static transformToVec4(v, m, out) {
        const { _x, _y, _z } = v;
        const e = m.elements;
        out._x = _x * e[0] + _y * e[4] + _z * e[8] + e[12];
        out._y = _x * e[1] + _y * e[5] + _z * e[9] + e[13];
        out._z = _x * e[2] + _y * e[6] + _z * e[10] + e[14];
        out._w = _x * e[3] + _y * e[7] + _z * e[11] + e[15];
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Performs a coordinate transformation using the given 4x4 matrix.
     *
     * @remarks
     * A coordinate transform performs the transformation with the assumption that the w component
     * is one. The four dimensional vector obtained from the transformation operation has each
     * component in the vector divided by the w component. This forces the w-component to be one and
     * therefore makes the vector homogeneous. The homogeneous vector is often preferred when working
     * with coordinates as the w component can safely be ignored.
     * @param v - The coordinate vector to transform
     * @param m - The transform matrix
     * @param out - The transformed coordinates
     */
    static transformCoordinate(v, m, out) {
        const { _x, _y, _z } = v;
        const e = m.elements;
        let w = _x * e[3] + _y * e[7] + _z * e[11] + e[15];
        w = 1.0 / w;
        out._x = (_x * e[0] + _y * e[4] + _z * e[8] + e[12]) * w;
        out._y = (_x * e[1] + _y * e[5] + _z * e[9] + e[13]) * w;
        out._z = (_x * e[2] + _y * e[6] + _z * e[10] + e[14]) * w;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Performs a transformation using the given quaternion.
     * @param v - The vector to transform
     * @param quaternion - The transform quaternion
     * @param out - The transformed vector
     */
    static transformByQuat(v, quaternion, out) {
        const { _x, _y, _z } = v;
        const { _x: qx, _y: qy, _z: qz, _w: qw } = quaternion;
        // calculate quat * vec
        const ix = qw * _x + qy * _z - qz * _y;
        const iy = qw * _y + qz * _x - qx * _z;
        const iz = qw * _z + qx * _y - qy * _x;
        const iw = -qx * _x - qy * _y - qz * _z;
        // calculate result * inverse quat
        out._x = ix * qw - iw * qx - iy * qz + iz * qy;
        out._y = iy * qw - iw * qy - iz * qx + ix * qz;
        out._z = iz * qw - iw * qz - ix * qy + iy * qx;
        out._onValueChanged && out._onValueChanged();
    }
    /** @internal */
    _x;
    /** @internal */
    _y;
    /** @internal */
    _z;
    /** @internal */
    _onValueChanged = null;
    /**
     * The x component of the vector.
     */
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * The y component of the vector.
     */
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * The z component of the vector.
     */
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * Constructor of Vector3.
     * @param x - The x component of the vector, default 0
     * @param y - The y component of the vector, default 0
     * @param z - The z component of the vector, default 0
     */
    constructor(x = 0, y = 0, z = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
    }
    /**
     * Set the value of this vector.
     * @param x - The x component of the vector
     * @param y - The y component of the vector
     * @param z - The z component of the vector
     * @returns This vector
     */
    setValue(x, y, z) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Set the value of this vector by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This vector
     */
    setValueByArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the sum of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    add(right) {
        this._x += right._x;
        this._y += right._y;
        this._z += right._z;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the difference of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    subtract(right) {
        this._x -= right._x;
        this._y -= right._y;
        this._z -= right._z;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the product of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    multiply(right) {
        this._x *= right._x;
        this._y *= right._y;
        this._z *= right._z;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the divisor of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    divide(right) {
        this._x /= right._x;
        this._y /= right._y;
        this._z /= right._z;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Calculate the length of this vector.
     * @returns The length of this vector
     */
    length() {
        const { _x, _y, _z } = this;
        return Math.sqrt(_x * _x + _y * _y + _z * _z);
    }
    /**
     * Calculate the squared length of this vector.
     * @returns The squared length of this vector
     */
    lengthSquared() {
        const { _x, _y, _z } = this;
        return _x * _x + _y * _y + _z * _z;
    }
    /**
     * Reverses the direction of this vector.
     * @returns This vector
     */
    negate() {
        this._x = -this._x;
        this._y = -this._y;
        this._z = -this._z;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Converts this vector into a unit vector.
     * @returns This vector
     */
    normalize() {
        Vector3.normalize(this, this);
        return this;
    }
    /**
     * Scale this vector by the given value.
     * @param s - The amount by which to scale the vector
     * @returns This vector
     */
    scale(s) {
        this._x *= s;
        this._y *= s;
        this._z *= s;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Clone the value of this vector to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out, outOffset = 0) {
        out[outOffset] = this._x;
        out[outOffset + 1] = this._y;
        out[outOffset + 2] = this._z;
    }
    /**
     * Creates a clone of this vector.
     * @returns A clone of this vector
     */
    clone() {
        return new Vector3(this._x, this._y, this._z);
    }
    /**
     * Clones this vector to the specified vector.
     * @param out - The specified vector
     * @returns The specified vector
     */
    cloneTo(out) {
        out._x = this._x;
        out._y = this._y;
        out._z = this._z;
        out._onValueChanged && out._onValueChanged();
        return out;
    }
    /**
     * This vector performs a normal transformation using the given 4x4 matrix.
     * @remarks
     * A normal transform performs the transformation with the assumption that the w component
     * is zero. This causes the fourth row and fourth column of the matrix to be unused. The
     * end result is a vector that is not translated, but all other transformation properties
     * apply. This is often preferred for normal vectors as normals purely represent direction
     * rather than location because normal vectors should not be translated.
     * @param m - The transform matrix
     * @returns This vector
     */
    transformNormal(m) {
        Vector3.transformNormal(this, m, this);
        return this;
    }
    /**
     * This vector performs a transformation using the given 4x4 matrix.
     * @param m - The transform matrix
     * @returns This vector
     */
    transformToVec3(m) {
        Vector3.transformToVec3(this, m, this);
        return this;
    }
    /**
     * This vector performs a coordinate transformation using the given 4x4 matrix.
     * @remarks
     * A coordinate transform performs the transformation with the assumption that the w component
     * is one. The four dimensional vector obtained from the transformation operation has each
     * component in the vector divided by the w component. This forces the w-component to be one and
     * therefore makes the vector homogeneous. The homogeneous vector is often preferred when working
     * with coordinates as the w component can safely be ignored.
     * @param m - The transform matrix
     * @returns This vector
     */
    transformCoordinate(m) {
        Vector3.transformCoordinate(this, m, this);
        return this;
    }
    /**
     * This vector performs a transformation using the given quaternion.
     * @param quaternion - The transform quaternion
     * @returns This vector
     */
    transformByQuat(quaternion) {
        Vector3.transformByQuat(this, quaternion, this);
        return this;
    }
}

/**
 * Describes a 4D-vector.
 */
class Vector4 {
    /** @internal */
    static _zero = new Vector4(0.0, 0.0, 0.0, 0.0);
    /** @internal */
    static _one = new Vector4(1.0, 1.0, 1.0, 1.0);
    /**
     * Determines the sum of two vectors.
     * @param left - The first vector to add
     * @param right - The second vector to add
     * @param out - The sum of two vectors
     */
    static add(left, right, out) {
        out._x = left._x + right._x;
        out._y = left._y + right._y;
        out._z = left._z + right._z;
        out._w = left._w + right._w;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the difference between two vectors.
     * @param left - The first vector to subtract
     * @param right - The second vector to subtract
     * @param out - The difference between two vectors
     */
    static subtract(left, right, out) {
        out._x = left._x - right._x;
        out._y = left._y - right._y;
        out._z = left._z - right._z;
        out._w = left._w - right._w;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the product of two vectors.
     * @param left - The first vector to multiply
     * @param right - The second vector to multiply
     * @param out - The product of two vectors
     */
    static multiply(left, right, out) {
        out._x = left._x * right._x;
        out._y = left._y * right._y;
        out._z = left._z * right._z;
        out._w = left._w * right._w;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the divisor of two vectors.
     * @param left - The first vector to divide
     * @param right - The second vector to divide
     * @param out - The divisor of two vectors
     */
    static divide(left, right, out) {
        out._x = left._x / right._x;
        out._y = left._y / right._y;
        out._z = left._z / right._z;
        out._w = left._w / right._w;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the dot product of two vectors.
     * @param left - The first vector to dot
     * @param right - The second vector to dot
     * @returns The dot product of two vectors
     */
    static dot(left, right) {
        return left._x * right._x + left._y * right._y + left._z * right._z + left._w * right._w;
    }
    /**
     * Determines the distance of two vectors.
     * @param a - The first vector
     * @param b - The second vector
     * @returns The distance of two vectors
     */
    static distance(a, b) {
        const x = b._x - a._x;
        const y = b._y - a._y;
        const z = b._z - a._z;
        const w = b._w - a._w;
        return Math.sqrt(x * x + y * y + z * z + w * w);
    }
    /**
     * Determines the squared distance of two vectors.
     * @param a - The first vector
     * @param b - The second vector
     * @returns The squared distance of two vectors
     */
    static distanceSquared(a, b) {
        const x = b._x - a._x;
        const y = b._y - a._y;
        const z = b._z - a._z;
        const w = b._w - a._w;
        return x * x + y * y + z * z + w * w;
    }
    /**
     * Determines whether the specified vectors are equals.
     * @param left - The first vector to compare
     * @param right - The second vector to compare
     * @returns True if the specified vectors are equals, false otherwise
     */
    static equals(left, right) {
        return (MathUtil.equals(left._x, right._x) &&
            MathUtil.equals(left._y, right._y) &&
            MathUtil.equals(left._z, right._z) &&
            MathUtil.equals(left._w, right._w));
    }
    /**
     * Performs a linear interpolation between two vectors.
     * @param start - The first vector
     * @param end - The second vector
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two vectors
     */
    static lerp(start, end, t, out) {
        const { _x, _y, _z, _w } = start;
        out._x = _x + (end._x - _x) * t;
        out._y = _y + (end._y - _y) * t;
        out._z = _z + (end._z - _z) * t;
        out._w = _w + (end._w - _w) * t;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a vector containing the largest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the largest components of the specified vectors
     */
    static max(left, right, out) {
        out._x = Math.max(left._x, right._x);
        out._y = Math.max(left._y, right._y);
        out._z = Math.max(left._z, right._z);
        out._w = Math.max(left._w, right._w);
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a vector containing the smallest components of the specified vectors.
     * @param left - The first vector
     * @param right - The second vector
     * @param out - The vector containing the smallest components of the specified vectors
     */
    static min(left, right, out) {
        out._x = Math.min(left._x, right._x);
        out._y = Math.min(left._y, right._y);
        out._z = Math.min(left._z, right._z);
        out._w = Math.min(left._w, right._w);
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Reverses the direction of a given vector.
     * @param a - The vector to negate
     * @param out - The vector facing in the opposite direction
     */
    static negate(a, out) {
        out._x = -a._x;
        out._y = -a._y;
        out._z = -a._z;
        out._w = -a._w;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Converts the vector into a unit vector.
     * @param a - The vector to normalize
     * @param out - The normalized vector
     */
    static normalize(a, out) {
        const { _x, _y, _z, _w } = a;
        let len = Math.sqrt(_x * _x + _y * _y + _z * _z + _w * _w);
        if (len > MathUtil.zeroTolerance) {
            len = 1 / len;
            out._x = _x * len;
            out._y = _y * len;
            out._z = _z * len;
            out._w = _w * len;
            out._onValueChanged && out._onValueChanged();
        }
    }
    /**
     * Scale a vector by the given value.
     * @param a - The vector to scale
     * @param s - The amount by which to scale the vector
     * @param out - The scaled vector
     */
    static scale(a, s, out) {
        out._x = a._x * s;
        out._y = a._y * s;
        out._z = a._z * s;
        out._w = a._w * s;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Performs a transformation using the given 4x4 matrix.
     * @param v - The vector to transform
     * @param m - The transform matrix
     * @param out - The transformed vector3
     */
    static transform(v, m, out) {
        const { _x, _y, _z, _w } = v;
        const e = m.elements;
        out._x = _x * e[0] + _y * e[4] + _z * e[8] + _w * e[12];
        out._y = _x * e[1] + _y * e[5] + _z * e[9] + _w * e[13];
        out._z = _x * e[2] + _y * e[6] + _z * e[10] + _w * e[14];
        out._w = _x * e[3] + _y * e[7] + _z * e[11] + _w * e[15];
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Performs a transformation using the given quaternion.
     * @param v - The vector to transform
     * @param q - The transform quaternion
     * @param out - The transformed vector
     */
    static transformByQuat(v, q, out) {
        const { _x: x, _y: y, _z: z, _w: w } = v;
        const qx = q._x;
        const qy = q._y;
        const qz = q._z;
        const qw = q._w;
        // calculate quat * vec
        const ix = qw * x + qy * z - qz * y;
        const iy = qw * y + qz * x - qx * z;
        const iz = qw * z + qx * y - qy * x;
        const iw = -qx * x - qy * y - qz * z;
        // calculate result * inverse quat
        out._x = ix * qw - iw * qx - iy * qz + iz * qy;
        out._y = iy * qw - iw * qy - iz * qx + ix * qz;
        out._z = iz * qw - iw * qz - ix * qy + iy * qx;
        out._w = w;
        out._onValueChanged && out._onValueChanged();
    }
    /** @internal */
    _x;
    /** @internal */
    _y;
    /** @internal */
    _z;
    /** @internal */
    _w;
    /** @internal */
    _onValueChanged = null;
    /**
     * The x component of the vector.
     */
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * The y component of the vector.
     */
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * The z component of the vector.
     */
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * The w component of the vector.
     */
    get w() {
        return this._w;
    }
    set w(value) {
        this._w = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * Constructor of Vector4.
     * @param x - The x component of the vector, default 0
     * @param y - The y component of the vector, default 0
     * @param z - The z component of the vector, default 0
     * @param w - The w component of the vector, default 0
     */
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    /**
     * Set the value of this vector.
     * @param x - The x component of the vector
     * @param y - The y component of the vector
     * @param z - The z component of the vector
     * @param w - The w component of the vector
     * @returns This vector
     */
    setValue(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Set the value of this vector by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This vector
     */
    setValueByArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the sum of this vector and the specified vector.
     * @param right - The specified vector
     * @returns This vector
     */
    add(right) {
        this._x += right._x;
        this._y += right._y;
        this._z += right._z;
        this._w += right._w;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the difference of this vector and the specified vector.
     * @param right - the specified vector
     * @returns This vector
     */
    subtract(right) {
        this._x -= right._x;
        this._y -= right._y;
        this._z -= right._z;
        this._w -= right._w;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the product of this vector and the specified vector.
     * @param right - the specified vector
     * @returns This vector
     */
    multiply(right) {
        this._x *= right._x;
        this._y *= right._y;
        this._z *= right._z;
        this._w *= right._w;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Determines the divisor of this vector and the specified vector.
     * @param right - the specified vector
     * @returns This vector
     */
    divide(right) {
        this._x /= right._x;
        this._y /= right._y;
        this._z /= right._z;
        this._w /= right._w;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Calculate the length of this vector.
     * @returns The length of this vector
     */
    length() {
        const { _x, _y, _z, _w } = this;
        return Math.sqrt(_x * _x + _y * _y + _z * _z + _w * _w);
    }
    /**
     * Calculate the squared length of this vector.
     * @returns The squared length of this vector
     */
    lengthSquared() {
        const { _x, _y, _z, _w } = this;
        return _x * _x + _y * _y + _z * _z + _w * _w;
    }
    /**
     * Reverses the direction of this vector.
     * @returns This vector
     */
    negate() {
        this._x = -this._x;
        this._y = -this._y;
        this._z = -this._z;
        this._w = -this._w;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Converts this vector into a unit vector.
     * @returns This vector
     */
    normalize() {
        Vector4.normalize(this, this);
        return this;
    }
    /**
     * Scale this vector by the given value.
     * @param s - The amount by which to scale the vector
     * @returns This vector
     */
    scale(s) {
        this._x *= s;
        this._y *= s;
        this._z *= s;
        this._w *= s;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Clone the value of this vector to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out, outOffset = 0) {
        out[outOffset] = this._x;
        out[outOffset + 1] = this._y;
        out[outOffset + 2] = this._z;
        out[outOffset + 3] = this._w;
    }
    /**
     * Creates a clone of this vector.
     * @returns A clone of this vector
     */
    clone() {
        let ret = new Vector4(this._x, this._y, this._z, this._w);
        return ret;
    }
    /**
     * Clones this vector to the specified vector.
     * @param out - The specified vector
     * @returns The specified vector
     */
    cloneTo(out) {
        out._x = this._x;
        out._y = this._y;
        out._z = this._z;
        out._w = this._w;
        out._onValueChanged && out._onValueChanged();
        return out;
    }
}

/**
 * Represents a 3x3 mathematical matrix.
 */
class Matrix3 {
    /**
     * Determines the sum of two matrices.
     * @param left - The first matrix to add
     * @param right - The second matrix to add
     * @param out - The sum of two matrices
     */
    static add(left, right, out) {
        const le = left.elements;
        const re = right.elements;
        const oe = out.elements;
        oe[0] = le[0] + re[0];
        oe[1] = le[1] + re[1];
        oe[2] = le[2] + re[2];
        oe[3] = le[3] + re[3];
        oe[4] = le[4] + re[4];
        oe[5] = le[5] + re[5];
        oe[6] = le[6] + re[6];
        oe[7] = le[7] + re[7];
        oe[8] = le[8] + re[8];
    }
    /**
     * Determines the difference between two matrices.
     * @param left - The first matrix to subtract
     * @param right - The second matrix to subtract
     * @param out - The difference between two matrices
     */
    static subtract(left, right, out) {
        const le = left.elements;
        const re = right.elements;
        const oe = out.elements;
        oe[0] = le[0] - re[0];
        oe[1] = le[1] - re[1];
        oe[2] = le[2] - re[2];
        oe[3] = le[3] - re[3];
        oe[4] = le[4] - re[4];
        oe[5] = le[5] - re[5];
        oe[6] = le[6] - re[6];
        oe[7] = le[7] - re[7];
        oe[8] = le[8] - re[8];
    }
    /**
     * Determines the product of two matrices.
     * @param left - The first matrix to multiply
     * @param right - The second matrix to multiply
     * @param out - The product of two matrices
     */
    static multiply(left, right, out) {
        const le = left.elements;
        const re = right.elements;
        const oe = out.elements;
        const l11 = le[0], l12 = le[1], l13 = le[2];
        const l21 = le[3], l22 = le[4], l23 = le[5];
        const l31 = le[6], l32 = le[7], l33 = le[8];
        const r11 = re[0], r12 = re[1], r13 = re[2];
        const r21 = re[3], r22 = re[4], r23 = re[5];
        const r31 = re[6], r32 = re[7], r33 = re[8];
        oe[0] = l11 * r11 + l21 * r12 + l31 * r13;
        oe[1] = l12 * r11 + l22 * r12 + l32 * r13;
        oe[2] = l13 * r11 + l23 * r12 + l33 * r13;
        oe[3] = l11 * r21 + l21 * r22 + l31 * r23;
        oe[4] = l12 * r21 + l22 * r22 + l32 * r23;
        oe[5] = l13 * r21 + l23 * r22 + l33 * r23;
        oe[6] = l11 * r31 + l21 * r32 + l31 * r33;
        oe[7] = l12 * r31 + l22 * r32 + l32 * r33;
        oe[8] = l13 * r31 + l23 * r32 + l33 * r33;
    }
    /**
     * Determines whether the specified matrices are equals.
     * @param left - The first matrix to compare
     * @param right - The second matrix to compare
     * @returns True if the specified matrices are equals, false otherwise
     */
    static equals(left, right) {
        const le = left.elements;
        const re = right.elements;
        return (MathUtil.equals(le[0], re[0]) &&
            MathUtil.equals(le[1], re[1]) &&
            MathUtil.equals(le[2], re[2]) &&
            MathUtil.equals(le[3], re[3]) &&
            MathUtil.equals(le[4], re[4]) &&
            MathUtil.equals(le[5], re[5]) &&
            MathUtil.equals(le[6], re[6]) &&
            MathUtil.equals(le[7], re[7]) &&
            MathUtil.equals(le[8], re[8]));
    }
    /**
     * Performs a linear interpolation between two matrices.
     * @param start - The first matrix
     * @param end - The second matrix
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two matrices
     */
    static lerp(start, end, t, out) {
        const se = start.elements;
        const ee = end.elements;
        const oe = out.elements;
        const inv = 1.0 - t;
        oe[0] = se[0] * inv + ee[0] * t;
        oe[1] = se[1] * inv + ee[1] * t;
        oe[2] = se[2] * inv + ee[2] * t;
        oe[3] = se[3] * inv + ee[3] * t;
        oe[4] = se[4] * inv + ee[4] * t;
        oe[5] = se[5] * inv + ee[5] * t;
        oe[6] = se[6] * inv + ee[6] * t;
        oe[7] = se[7] * inv + ee[7] * t;
        oe[8] = se[8] * inv + ee[8] * t;
    }
    /**
     * Calculate a rotation matrix from a quaternion.
     * @param quaternion - The quaternion used to calculate the matrix
     * @param out - The calculated rotation matrix
     */
    static rotationQuaternion(quaternion, out) {
        const oe = out.elements;
        const { _x: x, _y: y, _z: z, _w: w } = quaternion;
        const x2 = x + x;
        const y2 = y + y;
        const z2 = z + z;
        const xx = x * x2;
        const yx = y * x2;
        const yy = y * y2;
        const zx = z * x2;
        const zy = z * y2;
        const zz = z * z2;
        const wx = w * x2;
        const wy = w * y2;
        const wz = w * z2;
        oe[0] = 1 - yy - zz;
        oe[3] = yx - wz;
        oe[6] = zx + wy;
        oe[1] = yx + wz;
        oe[4] = 1 - xx - zz;
        oe[7] = zy - wx;
        oe[2] = zx - wy;
        oe[5] = zy + wx;
        oe[8] = 1 - xx - yy;
    }
    /**
     * Calculate a matrix from scale vector.
     * @param s - The scale vector
     * @param out - The calculated matrix
     */
    static scaling(s, out) {
        const oe = out.elements;
        oe[0] = s._x;
        oe[1] = 0;
        oe[2] = 0;
        oe[3] = 0;
        oe[4] = s._y;
        oe[5] = 0;
        oe[6] = 0;
        oe[7] = 0;
        oe[8] = 1;
    }
    /**
     * Calculate a matrix from translation vector.
     * @param translation - The translation vector
     * @param out - The calculated matrix
     */
    static translation(translation, out) {
        const oe = out.elements;
        oe[0] = 1;
        oe[1] = 0;
        oe[2] = 0;
        oe[3] = 0;
        oe[4] = 1;
        oe[5] = 0;
        oe[6] = translation._x;
        oe[7] = translation._y;
        oe[8] = 1;
    }
    /**
     * Calculate the inverse of the specified matrix.
     * @param a - The matrix whose inverse is to be calculated
     * @param out - The inverse of the specified matrix
     */
    static invert(a, out) {
        const ae = a.elements;
        const oe = out.elements;
        const a11 = ae[0], a12 = ae[1], a13 = ae[2];
        const a21 = ae[3], a22 = ae[4], a23 = ae[5];
        const a31 = ae[6], a32 = ae[7], a33 = ae[8];
        const b12 = a33 * a22 - a23 * a32;
        const b22 = -a33 * a21 + a23 * a31;
        const b32 = a32 * a21 - a22 * a31;
        let det = a11 * b12 + a12 * b22 + a13 * b32;
        if (!det) {
            return;
        }
        det = 1.0 / det;
        oe[0] = b12 * det;
        oe[1] = (-a33 * a12 + a13 * a32) * det;
        oe[2] = (a23 * a12 - a13 * a22) * det;
        oe[3] = b22 * det;
        oe[4] = (a33 * a11 - a13 * a31) * det;
        oe[5] = (-a23 * a11 + a13 * a21) * det;
        oe[6] = b32 * det;
        oe[7] = (-a32 * a11 + a12 * a31) * det;
        oe[8] = (a22 * a11 - a12 * a21) * det;
    }
    /**
     * Calculate a 3x3 normal matrix from a 4x4 matrix.
     * @remarks The calculation process is the transpose matrix of the inverse matrix.
     * @param mat4 - The 4x4 matrix
     * @param out - THe 3x3 normal matrix
     */
    static normalMatrix(mat4, out) {
        const ae = mat4.elements;
        const oe = out.elements;
        const a11 = ae[0], a12 = ae[1], a13 = ae[2], a14 = ae[3];
        const a21 = ae[4], a22 = ae[5], a23 = ae[6], a24 = ae[7];
        const a31 = ae[8], a32 = ae[9], a33 = ae[10], a34 = ae[11];
        const a41 = ae[12], a42 = ae[13], a43 = ae[14], a44 = ae[15];
        const b00 = a11 * a22 - a12 * a21;
        const b01 = a11 * a23 - a13 * a21;
        const b02 = a11 * a24 - a14 * a21;
        const b03 = a12 * a23 - a13 * a22;
        const b04 = a12 * a24 - a14 * a22;
        const b05 = a13 * a24 - a14 * a23;
        const b06 = a31 * a42 - a32 * a41;
        const b07 = a31 * a43 - a33 * a41;
        const b08 = a31 * a44 - a34 * a41;
        const b09 = a32 * a43 - a33 * a42;
        const b10 = a32 * a44 - a34 * a42;
        const b11 = a33 * a44 - a34 * a43;
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        oe[0] = (a22 * b11 - a23 * b10 + a24 * b09) * det;
        oe[1] = (a23 * b08 - a21 * b11 - a24 * b07) * det;
        oe[2] = (a21 * b10 - a22 * b08 + a24 * b06) * det;
        oe[3] = (a13 * b10 - a12 * b11 - a14 * b09) * det;
        oe[4] = (a11 * b11 - a13 * b08 + a14 * b07) * det;
        oe[5] = (a12 * b08 - a11 * b10 - a14 * b06) * det;
        oe[6] = (a42 * b05 - a43 * b04 + a44 * b03) * det;
        oe[7] = (a43 * b02 - a41 * b05 - a44 * b01) * det;
        oe[8] = (a41 * b04 - a42 * b02 + a44 * b00) * det;
    }
    /**
     * The specified matrix rotates around an angle.
     * @param a - The specified matrix
     * @param r - The rotation angle in radians
     * @param out - The rotated matrix
     */
    static rotate(a, r, out) {
        const ae = a.elements;
        const oe = out.elements;
        const s = Math.sin(r);
        const c = Math.cos(r);
        const a11 = ae[0], a12 = ae[1], a13 = ae[2];
        const a21 = ae[3], a22 = ae[4], a23 = ae[5];
        const a31 = ae[6], a32 = ae[7], a33 = ae[8];
        oe[0] = c * a11 + s * a21;
        oe[1] = c * a12 + s * a22;
        oe[2] = c * a13 + s * a23;
        oe[3] = c * a21 - s * a11;
        oe[4] = c * a22 - s * a12;
        oe[5] = c * a23 - s * a13;
        oe[6] = a31;
        oe[7] = a32;
        oe[8] = a33;
    }
    /**
     * Scale a matrix by a given vector.
     * @param m - The matrix
     * @param s - The given vector
     * @param out - The scaled matrix
     */
    static scale(m, s, out) {
        const { _x: x, _y: y } = s;
        const ae = m.elements;
        const oe = out.elements;
        oe[0] = x * ae[0];
        oe[1] = x * ae[1];
        oe[2] = x * ae[2];
        oe[3] = y * ae[3];
        oe[4] = y * ae[4];
        oe[5] = y * ae[5];
        oe[6] = ae[6];
        oe[7] = ae[7];
        oe[8] = ae[8];
    }
    /**
     * Translate a matrix by a given vector.
     * @param m - The matrix
     * @param translation - The given vector
     * @param out - The translated matrix
     */
    static translate(m, translation, out) {
        const { _x: x, _y: y } = translation;
        const ae = m.elements;
        const oe = out.elements;
        const a11 = ae[0], a12 = ae[1], a13 = ae[2];
        const a21 = ae[3], a22 = ae[4], a23 = ae[5];
        const a31 = ae[6], a32 = ae[7], a33 = ae[8];
        oe[0] = a11;
        oe[1] = a12;
        oe[2] = a13;
        oe[3] = a21;
        oe[4] = a22;
        oe[5] = a23;
        oe[6] = x * a11 + y * a21 + a31;
        oe[7] = x * a12 + y * a22 + a32;
        oe[8] = x * a13 + y * a23 + a33;
    }
    /**
     * Calculate the transpose of the specified matrix.
     * @param a - The specified matrix
     * @param out - The transpose of the specified matrix
     */
    static transpose(a, out) {
        const ae = a.elements;
        const oe = out.elements;
        if (out === a) {
            const a12 = ae[1];
            const a13 = ae[2];
            const a23 = ae[5];
            oe[1] = ae[3];
            oe[2] = ae[6];
            oe[3] = a12;
            oe[5] = ae[7];
            oe[6] = a13;
            oe[7] = a23;
        }
        else {
            oe[0] = ae[0];
            oe[1] = ae[3];
            oe[2] = ae[6];
            oe[3] = ae[1];
            oe[4] = ae[4];
            oe[5] = ae[7];
            oe[6] = ae[2];
            oe[7] = ae[5];
            oe[8] = ae[8];
        }
    }
    /**
     * An array containing the elements of the matrix (column matrix).
     * @remarks
     * elements[0] first column and first row value m11
     * elements[1] first column and second row value m12
     * elements[2] first column and third row value m13
     * elements[3] second column and first row value m21
     * and so on
     */
    elements = new Float32Array(9);
    /**
     * Constructor of 3*3 matrix.
     * @param m11 - Default 1 column 1, row 1
     * @param m12 - Default 0 column 1, row 2
     * @param m13 - Default 0 column 1, row 3
     * @param m21 - Default 0 column 2, row 1
     * @param m22 - Default 1 column 2, row 2
     * @param m23 - Default 0 column 2, row 3
     * @param m31 - Default 0 column 3, row 1
     * @param m32 - Default 0 column 3, row 2
     * @param m33 - Default 1 column 3, row 3
     */
    constructor(m11 = 1, m12 = 0, m13 = 0, m21 = 0, m22 = 1, m23 = 0, m31 = 0, m32 = 0, m33 = 1) {
        const e = this.elements;
        e[0] = m11;
        e[1] = m12;
        e[2] = m13;
        e[3] = m21;
        e[4] = m22;
        e[5] = m23;
        e[6] = m31;
        e[7] = m32;
        e[8] = m33;
    }
    /**
     * Set the value of this matrix, and return this matrix.
     * @param m11
     * @param m12
     * @param m13
     * @param m21
     * @param m22
     * @param m23
     * @param m31
     * @param m32
     * @param m33
     * @returns This matrix
     */
    setValue(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
        const e = this.elements;
        e[0] = m11;
        e[1] = m12;
        e[2] = m13;
        e[3] = m21;
        e[4] = m22;
        e[5] = m23;
        e[6] = m31;
        e[7] = m32;
        e[8] = m33;
        return this;
    }
    /**
     * Set the value of this matrix by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This matrix
     */
    setValueByArray(array, offset = 0) {
        const srce = this.elements;
        for (let i = 0; i < 12; i++) {
            srce[i] = array[i + offset];
        }
        return this;
    }
    /**
     * Set the value of this 3x3 matrix by the specified 4x4 matrix.
     * upper-left principle
     * @param a - The specified 4x4 matrix
     * @returns This 3x3 matrix
     */
    setValueByMatrix(a) {
        const ae = a.elements;
        const e = this.elements;
        e[0] = ae[0];
        e[1] = ae[1];
        e[2] = ae[2];
        e[3] = ae[4];
        e[4] = ae[5];
        e[5] = ae[6];
        e[6] = ae[8];
        e[7] = ae[9];
        e[8] = ae[10];
        return this;
    }
    /**
     * Clone the value of this matrix to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out, outOffset = 0) {
        const e = this.elements;
        out[outOffset] = e[0];
        out[outOffset + 1] = e[1];
        out[outOffset + 2] = e[2];
        out[outOffset + 3] = e[3];
        out[outOffset + 4] = e[4];
        out[outOffset + 5] = e[5];
        out[outOffset + 6] = e[6];
        out[outOffset + 7] = e[7];
        out[outOffset + 8] = e[8];
    }
    /**
     * Creates a clone of this matrix.
     * @returns A clone of this matrix
     */
    clone() {
        const e = this.elements;
        let ret = new Matrix3(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
        return ret;
    }
    /**
     * Clones this matrix to the specified matrix.
     * @param out - The specified matrix
     * @returns The specified matrix
     */
    cloneTo(out) {
        const e = this.elements;
        const oe = out.elements;
        oe[0] = e[0];
        oe[1] = e[1];
        oe[2] = e[2];
        oe[3] = e[3];
        oe[4] = e[4];
        oe[5] = e[5];
        oe[6] = e[6];
        oe[7] = e[7];
        oe[8] = e[8];
        return out;
    }
    /**
     * Determines the sum of this matrix and the specified matrix.
     * @param right - The specified matrix
     * @returns This matrix that store the sum of the two matrices
     */
    add(right) {
        Matrix3.add(this, right, this);
        return this;
    }
    /**
     * Determines the difference between this matrix and the specified matrix.
     * @param right - The specified matrix
     * @returns This matrix that store the difference between the two matrices
     */
    subtract(right) {
        Matrix3.subtract(this, right, this);
        return this;
    }
    /**
     * Determines the product of this matrix and the specified matrix.
     * @param right - The specified matrix
     * @returns This matrix that store the product of the two matrices
     */
    multiply(right) {
        Matrix3.multiply(this, right, this);
        return this;
    }
    /**
     * Calculate a determinant of this matrix.
     * @returns The determinant of this matrix
     */
    determinant() {
        const e = this.elements;
        const a11 = e[0], a12 = e[1], a13 = e[2];
        const a21 = e[3], a22 = e[4], a23 = e[5];
        const a31 = e[6], a32 = e[7], a33 = e[8];
        const b12 = a33 * a22 - a23 * a32;
        const b22 = -a33 * a21 + a23 * a31;
        const b32 = a32 * a21 - a22 * a31;
        return a11 * b12 + a12 * b22 + a13 * b32;
    }
    /**
     * Identity this matrix.
     * @returns This matrix after identity
     */
    identity() {
        const e = this.elements;
        e[0] = 1;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 1;
        e[5] = 0;
        e[6] = 0;
        e[7] = 0;
        e[8] = 1;
        return this;
    }
    /**
     * Invert the matrix.
     * @returns The matrix after invert
     */
    invert() {
        Matrix3.invert(this, this);
        return this;
    }
    /**
     * This matrix rotates around an angle.
     * @param r - The rotation angle in radians
     * @returns This matrix after rotate
     */
    rotate(r) {
        Matrix3.rotate(this, r, this);
        return this;
    }
    /**
     * Scale this matrix by a given vector.
     * @param s - The given vector
     * @returns This matrix after scale
     */
    scale(s) {
        Matrix3.scale(this, s, this);
        return this;
    }
    /**
     * Translate this matrix by a given vector.
     * @param translation - The given vector
     * @returns This matrix after translate
     */
    translate(translation) {
        Matrix3.translate(this, translation, this);
        return this;
    }
    /**
     * Calculate the transpose of this matrix.
     * @returns This matrix after transpose
     */
    transpose() {
        Matrix3.transpose(this, this);
        return this;
    }
}

/**
 * Represents a four dimensional mathematical quaternion.
 */
class Quaternion {
    /** @internal */
    static _tempVector3 = new Vector3();
    /** @internal */
    static _tempQuat1 = new Quaternion();
    /**
     * Determines the sum of two quaternions.
     * @param left - The first quaternion to add
     * @param right - The second quaternion to add
     * @param out - The sum of two quaternions
     */
    static add(left, right, out) {
        out._x = left._x + right._x;
        out._y = left._y + right._y;
        out._z = left._z + right._z;
        out._w = left._w + right._w;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the product of two quaternions.
     * @param left - The first quaternion to multiply
     * @param right - The second quaternion to multiply
     * @param out - The product of two quaternions
     */
    static multiply(left, right, out) {
        const ax = left._x, ay = left._y, az = left._z, aw = left._w;
        const bx = right._x, by = right._y, bz = right._z, bw = right._w;
        out._x = ax * bw + aw * bx + ay * bz - az * by;
        out._y = ay * bw + aw * by + az * bx - ax * bz;
        out._z = az * bw + aw * bz + ax * by - ay * bx;
        out._w = aw * bw - ax * bx - ay * by - az * bz;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate quaternion that contains conjugated version of the specified quaternion.
     * @param a - The specified quaternion
     * @param out - The conjugate version of the specified quaternion
     */
    static conjugate(a, out) {
        out._x = -a._x;
        out._y = -a._y;
        out._z = -a._z;
        out._w = a._w;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Determines the dot product of two quaternions.
     * @param left - The first quaternion to dot
     * @param right - The second quaternion to dot
     * @returns The dot product of two quaternions
     */
    static dot(left, right) {
        return left._x * right._x + left._y * right._y + left._z * right._z + left._w * right._w;
    }
    /**
     * Determines whether the specified quaternions are equals.
     * @param left - The first quaternion to compare
     * @param right - The second quaternion to compare
     * @returns True if the specified quaternions are equals, false otherwise
     */
    static equals(left, right) {
        return (MathUtil.equals(left._x, right._x) &&
            MathUtil.equals(left._y, right._y) &&
            MathUtil.equals(left._z, right._z) &&
            MathUtil.equals(left._w, right._w));
    }
    /**
     * Calculate a quaternion rotates around an arbitrary axis.
     * @param axis - The axis
     * @param rad - The rotation angle in radians
     * @param out - The quaternion after rotate
     */
    static rotationAxisAngle(axis, rad, out) {
        const normalAxis = Quaternion._tempVector3;
        Vector3.normalize(axis, normalAxis);
        rad *= 0.5;
        const s = Math.sin(rad);
        out._x = normalAxis._x * s;
        out._y = normalAxis._y * s;
        out._z = normalAxis._z * s;
        out._w = Math.cos(rad);
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a quaternion rotates around x, y, z axis (pitch/yaw/roll).
     * @param x - The radian of rotation around X (pitch)
     * @param y - The radian of rotation around Y (yaw)
     * @param z - The radian of rotation around Z (roll)
     * @param out - The calculated quaternion
     */
    static rotationEuler(x, y, z, out) {
        Quaternion.rotationYawPitchRoll(y, x, z, out);
    }
    /**
     * Calculate a quaternion from the specified yaw, pitch and roll angles.
     * @param yaw - Yaw around the y axis in radians
     * @param pitch - Pitch around the x axis in radians
     * @param roll - Roll around the z axis in radians
     * @param out - The calculated quaternion
     */
    static rotationYawPitchRoll(yaw, pitch, roll, out) {
        const halfRoll = roll * 0.5;
        const halfPitch = pitch * 0.5;
        const halfYaw = yaw * 0.5;
        const sinRoll = Math.sin(halfRoll);
        const cosRoll = Math.cos(halfRoll);
        const sinPitch = Math.sin(halfPitch);
        const cosPitch = Math.cos(halfPitch);
        const sinYaw = Math.sin(halfYaw);
        const cosYaw = Math.cos(halfYaw);
        const cosYawPitch = cosYaw * cosPitch;
        const sinYawPitch = sinYaw * sinPitch;
        out._x = cosYaw * sinPitch * cosRoll + sinYaw * cosPitch * sinRoll;
        out._y = sinYaw * cosPitch * cosRoll - cosYaw * sinPitch * sinRoll;
        out._z = cosYawPitch * sinRoll - sinYawPitch * cosRoll;
        out._w = cosYawPitch * cosRoll + sinYawPitch * sinRoll;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a quaternion from the specified 3x3 matrix.
     * @param m - The specified 3x3 matrix
     * @param out - The calculated quaternion
     */
    static rotationMatrix3x3(m, out) {
        const me = m.elements;
        const m11 = me[0], m12 = me[1], m13 = me[2];
        const m21 = me[3], m22 = me[4], m23 = me[5];
        const m31 = me[6], m32 = me[7], m33 = me[8];
        const scale = m11 + m22 + m33;
        let sqrt, half;
        if (scale > 0) {
            sqrt = Math.sqrt(scale + 1.0);
            out._w = sqrt * 0.5;
            sqrt = 0.5 / sqrt;
            out._x = (m23 - m32) * sqrt;
            out._y = (m31 - m13) * sqrt;
            out._z = (m12 - m21) * sqrt;
        }
        else if (m11 >= m22 && m11 >= m33) {
            sqrt = Math.sqrt(1.0 + m11 - m22 - m33);
            half = 0.5 / sqrt;
            out._x = 0.5 * sqrt;
            out._y = (m12 + m21) * half;
            out._z = (m13 + m31) * half;
            out._w = (m23 - m32) * half;
        }
        else if (m22 > m33) {
            sqrt = Math.sqrt(1.0 + m22 - m11 - m33);
            half = 0.5 / sqrt;
            out._x = (m21 + m12) * half;
            out._y = 0.5 * sqrt;
            out._z = (m32 + m23) * half;
            out._w = (m31 - m13) * half;
        }
        else {
            sqrt = Math.sqrt(1.0 + m33 - m11 - m22);
            half = 0.5 / sqrt;
            out._x = (m13 + m31) * half;
            out._y = (m23 + m32) * half;
            out._z = 0.5 * sqrt;
            out._w = (m12 - m21) * half;
        }
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate the inverse of the specified quaternion.
     * @param a - The quaternion whose inverse is to be calculated
     * @param out - The inverse of the specified quaternion
     */
    static invert(a, out) {
        const { _x: x, _y: y, _z: z, _w: w } = a;
        const dot = x * x + y * y + z * z + w * w;
        if (dot > MathUtil.zeroTolerance) {
            const invDot = 1.0 / dot;
            out._x = -x * invDot;
            out._y = -y * invDot;
            out._z = -z * invDot;
            out._w = w * invDot;
            out._onValueChanged && out._onValueChanged();
        }
    }
    /**
     * Performs a linear blend between two quaternions.
     * @param start - The first quaternion
     * @param end - The second quaternion
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two quaternions
     */
    static lerp(start, end, t, out) {
        const inv = 1.0 - t;
        if (Quaternion.dot(start, end) >= 0) {
            out._x = start._x * inv + end._x * t;
            out._y = start._y * inv + end._y * t;
            out._z = start._z * inv + end._z * t;
            out._w = start._w * inv + end._w * t;
        }
        else {
            out._x = start._x * inv - end._x * t;
            out._y = start._y * inv - end._y * t;
            out._z = start._z * inv - end._z * t;
            out._w = start._w * inv - end._w * t;
        }
        out.normalize();
    }
    /**
     * Performs a spherical linear blend between two quaternions.
     * @param start - The first quaternion
     * @param end - The second quaternion
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of spherical linear blending between two quaternions
     */
    static slerp(start, end, t, out) {
        const ax = start._x;
        const ay = start._y;
        const az = start._z;
        const aw = start._w;
        let bx = end._x;
        let by = end._y;
        let bz = end._z;
        let bw = end._w;
        let scale0, scale1;
        // calc cosine
        let cosom = ax * bx + ay * by + az * bz + aw * bw;
        // adjust signs (if necessary)
        if (cosom < 0.0) {
            cosom = -cosom;
            bx = -bx;
            by = -by;
            bz = -bz;
            bw = -bw;
        }
        // calculate coefficients
        if (1.0 - cosom > MathUtil.zeroTolerance) {
            // standard case (slerp)
            const omega = Math.acos(cosom);
            const sinom = Math.sin(omega);
            scale0 = Math.sin((1.0 - t) * omega) / sinom;
            scale1 = Math.sin(t * omega) / sinom;
        }
        else {
            // "from" and "to" quaternions are very close
            //  ... so we can do a linear interpolation
            scale0 = 1.0 - t;
            scale1 = t;
        }
        // calculate final values
        out._x = scale0 * ax + scale1 * bx;
        out._y = scale0 * ay + scale1 * by;
        out._z = scale0 * az + scale1 * bz;
        out._w = scale0 * aw + scale1 * bw;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Scales the specified quaternion magnitude to unit length.
     * @param a - The specified quaternion
     * @param out - The normalized quaternion
     */
    static normalize(a, out) {
        const { _x, _y, _z, _w } = a;
        let len = Math.sqrt(_x * _x + _y * _y + _z * _z + _w * _w);
        if (len > MathUtil.zeroTolerance) {
            len = 1 / len;
            out._x = _x * len;
            out._y = _y * len;
            out._z = _z * len;
            out._w = _w * len;
            out._onValueChanged && out._onValueChanged();
        }
    }
    /**
     * Calculate a quaternion rotate around X axis.
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotationX(rad, out) {
        rad *= 0.5;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out._x = s;
        out._y = 0;
        out._z = 0;
        out._w = c;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a quaternion rotate around Y axis.
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotationY(rad, out) {
        rad *= 0.5;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out._x = 0;
        out._y = s;
        out._z = 0;
        out._w = c;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a quaternion rotate around Z axis.
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotationZ(rad, out) {
        rad *= 0.5;
        const s = Math.sin(rad);
        const c = Math.cos(rad);
        out._x = 0;
        out._y = 0;
        out._z = s;
        out._w = c;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a quaternion that the specified quaternion rotate around X axis.
     * @param quaternion - The specified quaternion
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotateX(quaternion, rad, out) {
        const { _x, _y, _z, _w } = quaternion;
        rad *= 0.5;
        const bx = Math.sin(rad);
        const bw = Math.cos(rad);
        out._x = _x * bw + _w * bx;
        out._y = _y * bw + _z * bx;
        out._z = _z * bw - _y * bx;
        out._w = _w * bw - _x * bx;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a quaternion that the specified quaternion rotate around Y axis.
     * @param quaternion - The specified quaternion
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotateY(quaternion, rad, out) {
        const { _x, _y, _z, _w } = quaternion;
        rad *= 0.5;
        const by = Math.sin(rad);
        const bw = Math.cos(rad);
        out._x = _x * bw - _z * by;
        out._y = _y * bw + _w * by;
        out._z = _z * bw + _x * by;
        out._w = _w * bw - _y * by;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Calculate a quaternion that the specified quaternion rotate around Z axis.
     * @param quaternion - The specified quaternion
     * @param rad - The rotation angle in radians
     * @param out - The calculated quaternion
     */
    static rotateZ(quaternion, rad, out) {
        const { _x, _y, _z, _w } = quaternion;
        rad *= 0.5;
        const bz = Math.sin(rad);
        const bw = Math.cos(rad);
        out._x = _x * bw + _y * bz;
        out._y = _y * bw - _x * bz;
        out._z = _z * bw + _w * bz;
        out._w = _w * bw - _z * bz;
        out._onValueChanged && out._onValueChanged();
    }
    /**
     * Scale a quaternion by a given number.
     * @param a - The quaternion
     * @param s - The given number
     * @param out - The scaled quaternion
     */
    static scale(a, s, out) {
        out._x = a._x * s;
        out._y = a._y * s;
        out._z = a._z * s;
        out._w = a._w * s;
        out._onValueChanged && out._onValueChanged();
    }
    /** @internal */
    _x;
    /** @internal */
    _y;
    /** @internal */
    _z;
    /** @internal */
    _w;
    /** @internal */
    _onValueChanged = null;
    /**
     * The x component of the quaternion.
     */
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * The y component of the quaternion.
     */
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * The z component of the quaternion.
     */
    get z() {
        return this._z;
    }
    set z(value) {
        this._z = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * Indicting whether this instance is normalized.
     */
    get normalized() {
        return (Math.abs(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w - 1) <
            MathUtil.zeroTolerance);
    }
    /**
     * The w component of the quaternion.
     */
    get w() {
        return this._w;
    }
    set w(value) {
        this._w = value;
        this._onValueChanged && this._onValueChanged();
    }
    /**
     * Constructor of Quaternion.
     * @param x - The x component of the quaternion, default 0
     * @param y - The y component of the quaternion, default 0
     * @param z - The z component of the quaternion, default 0
     * @param w - The w component of the quaternion, default 1
     */
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
    }
    /**
     * Set the value of this quaternion, and return this quaternion.
     * @param x - The x component of the quaternion
     * @param y - The y component of the quaternion
     * @param z - The z component of the quaternion
     * @param w - The w component of the quaternion
     * @returns This quaternion
     */
    setValue(x, y, z, w) {
        this._x = x;
        this._y = y;
        this._z = z;
        this._w = w;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Set the value of this quaternion by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This quaternion
     */
    setValueByArray(array, offset = 0) {
        this._x = array[offset];
        this._y = array[offset + 1];
        this._z = array[offset + 2];
        this._w = array[offset + 3];
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Transforms this quaternion into its conjugated version.
     * @returns This quaternion
     */
    conjugate() {
        this._x *= -1;
        this._y *= -1;
        this._z *= -1;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Get the rotation axis and rotation angle of the quaternion (unit: radians).
     * @param out - The axis as an output parameter
     * @returns The rotation angle (unit: radians)
     */
    getAxisAngle(out) {
        const { _x, _y, _z } = this;
        const length = _x * _x + _y * _y + _z * _z;
        if (length < MathUtil.zeroTolerance) {
            out._x = 1;
            out._y = 0;
            out._z = 0;
            return 0;
        }
        else {
            const inv = 1.0 / length;
            out._x = this._x * inv;
            out._y = this._y * inv;
            out._z = this._z * inv;
            return Math.acos(this._w) * 2.0;
        }
    }
    /**
     * Identity this quaternion.
     * @returns This quaternion after identity
     */
    identity() {
        this._x = 0;
        this._y = 0;
        this._z = 0;
        this._w = 1;
        this._onValueChanged && this._onValueChanged();
        return this;
    }
    /**
     * Calculate the length of this quaternion.
     * @returns The length of this quaternion
     */
    length() {
        const { _x, _y, _z, _w } = this;
        return Math.sqrt(_x * _x + _y * _y + _z * _z + _w * _w);
    }
    /**
     * Calculates the squared length of this quaternion.
     * @returns The squared length of this quaternion
     */
    lengthSquared() {
        const { _x, _y, _z, _w } = this;
        return _x * _x + _y * _y + _z * _z + _w * _w;
    }
    /**
     * Converts this quaternion into a unit quaternion.
     * @returns This quaternion
     */
    normalize() {
        Quaternion.normalize(this, this);
        return this;
    }
    /**
     * Get the euler of this quaternion.
     * @param out - The euler (in radians) as an output parameter
     * @returns Euler x->pitch y->yaw z->roll
     */
    toEuler(out) {
        this._toYawPitchRoll(out);
        const t = out._x;
        out._x = out._y;
        out._y = t;
        out._onValueChanged && out._onValueChanged();
        return out;
    }
    /**
     * Get the euler of this quaternion.
     * @param out - The euler (in radians) as an output parameter
     * @returns Euler x->yaw y->pitch z->roll
     */
    toYawPitchRoll(out) {
        this._toYawPitchRoll(out);
        out._onValueChanged && out._onValueChanged();
        return out;
    }
    /**
     * Clone the value of this quaternion to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out, outOffset = 0) {
        out[outOffset] = this._x;
        out[outOffset + 1] = this._y;
        out[outOffset + 2] = this._z;
        out[outOffset + 3] = this._w;
    }
    /**
     * Creates a clone of this quaternion.
     * @returns A clone of this quaternion
     */
    clone() {
        return new Quaternion(this._x, this._y, this._z, this._w);
    }
    /**
     * Clones this quaternion to the specified quaternion.
     * @param out - The specified quaternion
     * @returns The specified quaternion
     */
    cloneTo(out) {
        out._x = this._x;
        out._y = this._y;
        out._z = this._z;
        out._w = this._w;
        out._onValueChanged && out._onValueChanged();
        return out;
    }
    /**
     * Calculate this quaternion rotate around X axis.
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotateX(rad) {
        Quaternion.rotateX(this, rad, this);
        return this;
    }
    /**
     * Calculate this quaternion rotate around Y axis.
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotateY(rad) {
        Quaternion.rotateY(this, rad, this);
        return this;
    }
    /**
     * Calculate this quaternion rotate around Z axis.
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotateZ(rad) {
        Quaternion.rotateZ(this, rad, this);
        return this;
    }
    /**
     * Calculate this quaternion rotates around an arbitrary axis.
     * @param axis - The axis
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotationAxisAngle(axis, rad) {
        Quaternion.rotationAxisAngle(axis, rad, this);
        return this;
    }
    /**
     * Determines the product of this quaternion and the specified quaternion.
     * @param quat - The specified quaternion
     * @returns The product of the two quaternions
     */
    multiply(quat) {
        Quaternion.multiply(this, quat, this);
        return this;
    }
    /**
     * Invert this quaternion.
     * @returns This quaternion after invert
     */
    invert() {
        Quaternion.invert(this, this);
        return this;
    }
    /**
     * Determines the dot product of this quaternion and the specified quaternion.
     * @param quat - The specified quaternion
     * @returns The dot product of two quaternions
     */
    dot(quat) {
        return Quaternion.dot(this, quat);
    }
    /**
     * Performs a linear blend between this quaternion and the specified quaternion.
     * @param quat - The specified quaternion
     * @param t - The blend amount where 0 returns this and 1 quat
     * @returns - The result of linear blending between two quaternions
     */
    lerp(quat, t) {
        Quaternion.lerp(this, quat, t, this);
        return this;
    }
    /**
     * Calculate this quaternion rotation around an arbitrary axis.
     * @param axis - The axis
     * @param rad - The rotation angle in radians
     * @returns This quaternion
     */
    rotateAxisAngle(axis, rad) {
        Quaternion._tempQuat1.rotationAxisAngle(axis, rad);
        this.multiply(Quaternion._tempQuat1);
        return this;
    }
    _toYawPitchRoll(out) {
        const { _x, _y, _z, _w } = this;
        const xx = _x * _x;
        const yy = _y * _y;
        const zz = _z * _z;
        const xy = _x * _y;
        const zw = _z * _w;
        const zx = _z * _x;
        const yw = _y * _w;
        const yz = _y * _z;
        const xw = _x * _w;
        out._y = Math.asin(2.0 * (xw - yz));
        if (Math.cos(out.y) > MathUtil.zeroTolerance) {
            out._z = Math.atan2(2.0 * (xy + zw), 1.0 - 2.0 * (zz + xx));
            out._x = Math.atan2(2.0 * (zx + yw), 1.0 - 2.0 * (yy + xx));
        }
        else {
            out._z = Math.atan2(-2.0 * (xy - zw), 1.0 - 2.0 * (yy + zz));
            out._x = 0.0;
        }
        return out;
    }
}

/**
 * Represents a 4x4 mathematical matrix.
 */
class Matrix4 {
    static _tempVec30 = new Vector3();
    static _tempVec31 = new Vector3();
    static _tempVec32 = new Vector3();
    static _tempMat30 = new Matrix3();
    /** @internal Identity matrix. */
    static _identity = new Matrix4(1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 1.0);
    /**
     * Determines the product of two matrices.
     * @param left - The first matrix to multiply
     * @param right - The second matrix to multiply
     * @param out - The product of the two matrices
     */
    static multiply(left, right, out) {
        const le = left.elements;
        const re = right.elements;
        const oe = out.elements;
        const l11 = le[0], l12 = le[1], l13 = le[2], l14 = le[3];
        const l21 = le[4], l22 = le[5], l23 = le[6], l24 = le[7];
        const l31 = le[8], l32 = le[9], l33 = le[10], l34 = le[11];
        const l41 = le[12], l42 = le[13], l43 = le[14], l44 = le[15];
        const r11 = re[0], r12 = re[1], r13 = re[2], r14 = re[3];
        const r21 = re[4], r22 = re[5], r23 = re[6], r24 = re[7];
        const r31 = re[8], r32 = re[9], r33 = re[10], r34 = re[11];
        const r41 = re[12], r42 = re[13], r43 = re[14], r44 = re[15];
        oe[0] = l11 * r11 + l21 * r12 + l31 * r13 + l41 * r14;
        oe[1] = l12 * r11 + l22 * r12 + l32 * r13 + l42 * r14;
        oe[2] = l13 * r11 + l23 * r12 + l33 * r13 + l43 * r14;
        oe[3] = l14 * r11 + l24 * r12 + l34 * r13 + l44 * r14;
        oe[4] = l11 * r21 + l21 * r22 + l31 * r23 + l41 * r24;
        oe[5] = l12 * r21 + l22 * r22 + l32 * r23 + l42 * r24;
        oe[6] = l13 * r21 + l23 * r22 + l33 * r23 + l43 * r24;
        oe[7] = l14 * r21 + l24 * r22 + l34 * r23 + l44 * r24;
        oe[8] = l11 * r31 + l21 * r32 + l31 * r33 + l41 * r34;
        oe[9] = l12 * r31 + l22 * r32 + l32 * r33 + l42 * r34;
        oe[10] = l13 * r31 + l23 * r32 + l33 * r33 + l43 * r34;
        oe[11] = l14 * r31 + l24 * r32 + l34 * r33 + l44 * r34;
        oe[12] = l11 * r41 + l21 * r42 + l31 * r43 + l41 * r44;
        oe[13] = l12 * r41 + l22 * r42 + l32 * r43 + l42 * r44;
        oe[14] = l13 * r41 + l23 * r42 + l33 * r43 + l43 * r44;
        oe[15] = l14 * r41 + l24 * r42 + l34 * r43 + l44 * r44;
    }
    /**
     * Determines whether the specified matrices are equals.
     * @param left - The first matrix to compare
     * @param right - The second matrix to compare
     * @returns True if the specified matrices are equals, false otherwise
     */
    static equals(left, right) {
        const le = left.elements;
        const re = right.elements;
        return (MathUtil.equals(le[0], re[0]) &&
            MathUtil.equals(le[1], re[1]) &&
            MathUtil.equals(le[2], re[2]) &&
            MathUtil.equals(le[3], re[3]) &&
            MathUtil.equals(le[4], re[4]) &&
            MathUtil.equals(le[5], re[5]) &&
            MathUtil.equals(le[6], re[6]) &&
            MathUtil.equals(le[7], re[7]) &&
            MathUtil.equals(le[8], re[8]) &&
            MathUtil.equals(le[9], re[9]) &&
            MathUtil.equals(le[10], re[10]) &&
            MathUtil.equals(le[11], re[11]) &&
            MathUtil.equals(le[12], re[12]) &&
            MathUtil.equals(le[13], re[13]) &&
            MathUtil.equals(le[14], re[14]) &&
            MathUtil.equals(le[15], re[15]));
    }
    /**
     * Performs a linear interpolation between two matrices.
     * @param start - The first matrix
     * @param end - The second matrix
     * @param t - The blend amount where 0 returns start and 1 end
     * @param out - The result of linear blending between two matrices
     */
    static lerp(start, end, t, out) {
        const se = start.elements;
        const ee = end.elements;
        const oe = out.elements;
        const inv = 1.0 - t;
        oe[0] = se[0] * inv + ee[0] * t;
        oe[1] = se[1] * inv + ee[1] * t;
        oe[2] = se[2] * inv + ee[2] * t;
        oe[3] = se[3] * inv + ee[3] * t;
        oe[4] = se[4] * inv + ee[4] * t;
        oe[5] = se[5] * inv + ee[5] * t;
        oe[6] = se[6] * inv + ee[6] * t;
        oe[7] = se[7] * inv + ee[7] * t;
        oe[8] = se[8] * inv + ee[8] * t;
        oe[9] = se[9] * inv + ee[9] * t;
        oe[10] = se[10] * inv + ee[10] * t;
        oe[11] = se[11] * inv + ee[11] * t;
        oe[12] = se[12] * inv + ee[12] * t;
        oe[13] = se[13] * inv + ee[13] * t;
        oe[14] = se[14] * inv + ee[14] * t;
        oe[15] = se[15] * inv + ee[15] * t;
    }
    /**
     * Calculate a rotation matrix from a quaternion.
     * @param quaternion - The quaternion used to calculate the matrix
     * @param out - The calculated rotation matrix
     */
    static rotationQuaternion(quaternion, out) {
        const oe = out.elements;
        const { _x: x, _y: y, _z: z, _w: w } = quaternion;
        let x2 = x + x;
        let y2 = y + y;
        let z2 = z + z;
        let xx = x * x2;
        let yx = y * x2;
        let yy = y * y2;
        let zx = z * x2;
        let zy = z * y2;
        let zz = z * z2;
        let wx = w * x2;
        let wy = w * y2;
        let wz = w * z2;
        oe[0] = 1 - yy - zz;
        oe[1] = yx + wz;
        oe[2] = zx - wy;
        oe[3] = 0;
        oe[4] = yx - wz;
        oe[5] = 1 - xx - zz;
        oe[6] = zy + wx;
        oe[7] = 0;
        oe[8] = zx + wy;
        oe[9] = zy - wx;
        oe[10] = 1 - xx - yy;
        oe[11] = 0;
        oe[12] = 0;
        oe[13] = 0;
        oe[14] = 0;
        oe[15] = 1;
    }
    /**
     * Calculate a matrix rotates around an arbitrary axis.
     * @param axis - The axis
     * @param r - The rotation angle in radians
     * @param out - The matrix after rotate
     */
    static rotationAxisAngle(axis, r, out) {
        const oe = out.elements;
        let { _x: x, _y: y, _z: z } = axis;
        let len = Math.sqrt(x * x + y * y + z * z);
        let s, c, t;
        if (Math.abs(len) < MathUtil.zeroTolerance) {
            return;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(r);
        c = Math.cos(r);
        t = 1 - c;
        // Perform rotation-specific matrix multiplication
        oe[0] = x * x * t + c;
        oe[1] = y * x * t + z * s;
        oe[2] = z * x * t - y * s;
        oe[3] = 0;
        oe[4] = x * y * t - z * s;
        oe[5] = y * y * t + c;
        oe[6] = z * y * t + x * s;
        oe[7] = 0;
        oe[8] = x * z * t + y * s;
        oe[9] = y * z * t - x * s;
        oe[10] = z * z * t + c;
        oe[11] = 0;
        oe[12] = 0;
        oe[13] = 0;
        oe[14] = 0;
        oe[15] = 1;
    }
    /**
     * Calculate a matrix from a quaternion and a translation.
     * @param quaternion - The quaternion used to calculate the matrix
     * @param translation - The translation used to calculate the matrix
     * @param out - The calculated matrix
     */
    static rotationTranslation(quaternion, translation, out) {
        Matrix4.rotationQuaternion(quaternion, out);
        const oe = out.elements;
        oe[12] = translation._x;
        oe[13] = translation._y;
        oe[14] = translation._z;
    }
    /**
     * Calculate an affine matrix.
     * @param scale - The scale used to calculate matrix
     * @param rotation - The rotation used to calculate matrix
     * @param translation - The translation used to calculate matrix
     * @param out - The calculated matrix
     */
    static affineTransformation(scale, rotation, translation, out) {
        const oe = out.elements;
        const { _x: x, _y: y, _z: z, _w: w } = rotation;
        let x2 = x + x;
        let y2 = y + y;
        let z2 = z + z;
        let xx = x * x2;
        let xy = x * y2;
        let xz = x * z2;
        let yy = y * y2;
        let yz = y * z2;
        let zz = z * z2;
        let wx = w * x2;
        let wy = w * y2;
        let wz = w * z2;
        let sx = scale._x;
        let sy = scale._y;
        let sz = scale._z;
        oe[0] = (1 - (yy + zz)) * sx;
        oe[1] = (xy + wz) * sx;
        oe[2] = (xz - wy) * sx;
        oe[3] = 0;
        oe[4] = (xy - wz) * sy;
        oe[5] = (1 - (xx + zz)) * sy;
        oe[6] = (yz + wx) * sy;
        oe[7] = 0;
        oe[8] = (xz + wy) * sz;
        oe[9] = (yz - wx) * sz;
        oe[10] = (1 - (xx + yy)) * sz;
        oe[11] = 0;
        oe[12] = translation._x;
        oe[13] = translation._y;
        oe[14] = translation._z;
        oe[15] = 1;
    }
    /**
     * Calculate a matrix from scale vector.
     * @param s - The scale vector
     * @param out - The calculated matrix
     */
    static scaling(s, out) {
        const oe = out.elements;
        oe[0] = s._x;
        oe[1] = 0;
        oe[2] = 0;
        oe[3] = 0;
        oe[4] = 0;
        oe[5] = s._y;
        oe[6] = 0;
        oe[7] = 0;
        oe[8] = 0;
        oe[9] = 0;
        oe[10] = s._z;
        oe[11] = 0;
        oe[12] = 0;
        oe[13] = 0;
        oe[14] = 0;
        oe[15] = 1;
    }
    /**
     * Calculate a matrix from translation vector.
     * @param translation - The translation vector
     * @param out - The calculated matrix
     */
    static translation(translation, out) {
        const oe = out.elements;
        oe[0] = 1;
        oe[1] = 0;
        oe[2] = 0;
        oe[3] = 0;
        oe[4] = 0;
        oe[5] = 1;
        oe[6] = 0;
        oe[7] = 0;
        oe[8] = 0;
        oe[9] = 0;
        oe[10] = 1;
        oe[11] = 0;
        oe[12] = translation._x;
        oe[13] = translation._y;
        oe[14] = translation._z;
        oe[15] = 1;
    }
    /**
     * Calculate the inverse of the specified matrix.
     * @param a - The matrix whose inverse is to be calculated
     * @param out - The inverse of the specified matrix
     */
    static invert(a, out) {
        const ae = a.elements;
        const oe = out.elements;
        const a11 = ae[0], a12 = ae[1], a13 = ae[2], a14 = ae[3];
        const a21 = ae[4], a22 = ae[5], a23 = ae[6], a24 = ae[7];
        const a31 = ae[8], a32 = ae[9], a33 = ae[10], a34 = ae[11];
        const a41 = ae[12], a42 = ae[13], a43 = ae[14], a44 = ae[15];
        const b00 = a11 * a22 - a12 * a21;
        const b01 = a11 * a23 - a13 * a21;
        const b02 = a11 * a24 - a14 * a21;
        const b03 = a12 * a23 - a13 * a22;
        const b04 = a12 * a24 - a14 * a22;
        const b05 = a13 * a24 - a14 * a23;
        const b06 = a31 * a42 - a32 * a41;
        const b07 = a31 * a43 - a33 * a41;
        const b08 = a31 * a44 - a34 * a41;
        const b09 = a32 * a43 - a33 * a42;
        const b10 = a32 * a44 - a34 * a42;
        const b11 = a33 * a44 - a34 * a43;
        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        oe[0] = (a22 * b11 - a23 * b10 + a24 * b09) * det;
        oe[1] = (a13 * b10 - a12 * b11 - a14 * b09) * det;
        oe[2] = (a42 * b05 - a43 * b04 + a44 * b03) * det;
        oe[3] = (a33 * b04 - a32 * b05 - a34 * b03) * det;
        oe[4] = (a23 * b08 - a21 * b11 - a24 * b07) * det;
        oe[5] = (a11 * b11 - a13 * b08 + a14 * b07) * det;
        oe[6] = (a43 * b02 - a41 * b05 - a44 * b01) * det;
        oe[7] = (a31 * b05 - a33 * b02 + a34 * b01) * det;
        oe[8] = (a21 * b10 - a22 * b08 + a24 * b06) * det;
        oe[9] = (a12 * b08 - a11 * b10 - a14 * b06) * det;
        oe[10] = (a41 * b04 - a42 * b02 + a44 * b00) * det;
        oe[11] = (a32 * b02 - a31 * b04 - a34 * b00) * det;
        oe[12] = (a22 * b07 - a21 * b09 - a23 * b06) * det;
        oe[13] = (a11 * b09 - a12 * b07 + a13 * b06) * det;
        oe[14] = (a42 * b01 - a41 * b03 - a43 * b00) * det;
        oe[15] = (a31 * b03 - a32 * b01 + a33 * b00) * det;
    }
    /**
     * Calculate a right-handed look-at matrix.
     * @param eye - The position of the viewer's eye
     * @param target - The camera look-at target
     * @param up - The camera's up vector
     * @param out - The calculated look-at matrix
     */
    static lookAt(eye, target, up, out) {
        const oe = out.elements;
        const xAxis = Matrix4._tempVec30;
        const yAxis = Matrix4._tempVec31;
        const zAxis = Matrix4._tempVec32;
        Vector3.subtract(eye, target, zAxis);
        zAxis.normalize();
        Vector3.cross(up, zAxis, xAxis);
        xAxis.normalize();
        Vector3.cross(zAxis, xAxis, yAxis);
        oe[0] = xAxis._x;
        oe[1] = yAxis._x;
        oe[2] = zAxis._x;
        oe[3] = 0;
        oe[4] = xAxis._y;
        oe[5] = yAxis._y;
        oe[6] = zAxis._y;
        oe[7] = 0;
        oe[8] = xAxis._z;
        oe[9] = yAxis._z;
        oe[10] = zAxis._z;
        oe[11] = 0;
        oe[12] = -Vector3.dot(xAxis, eye);
        oe[13] = -Vector3.dot(yAxis, eye);
        oe[14] = -Vector3.dot(zAxis, eye);
        oe[15] = 1;
    }
    /**
     * Calculate an orthographic projection matrix.
     * @param left - The left edge of the viewing
     * @param right - The right edge of the viewing
     * @param bottom - The bottom edge of the viewing
     * @param top - The top edge of the viewing
     * @param near - The depth of the near plane
     * @param far - The depth of the far plane
     * @param out - The calculated orthographic projection matrix
     */
    static ortho(left, right, bottom, top, near, far, out) {
        const oe = out.elements;
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);
        oe[0] = -2 * lr;
        oe[1] = 0;
        oe[2] = 0;
        oe[3] = 0;
        oe[4] = 0;
        oe[5] = -2 * bt;
        oe[6] = 0;
        oe[7] = 0;
        oe[8] = 0;
        oe[9] = 0;
        oe[10] = 2 * nf;
        oe[11] = 0;
        oe[12] = (left + right) * lr;
        oe[13] = (top + bottom) * bt;
        oe[14] = (far + near) * nf;
        oe[15] = 1;
    }
    /**
     * Calculate a perspective projection matrix.
     * @param fovY - Field of view in the y direction, in radians
     * @param aspect - Aspect ratio, defined as view space width divided by height
     * @param near - The depth of the near plane
     * @param far - The depth of the far plane
     * @param out - The calculated perspective projection matrix
     */
    static perspective(fovY, aspect, near, far, out) {
        const oe = out.elements;
        const f = 1.0 / Math.tan(fovY / 2);
        const nf = 1 / (near - far);
        oe[0] = f / aspect;
        oe[1] = 0;
        oe[2] = 0;
        oe[3] = 0;
        oe[4] = 0;
        oe[5] = f;
        oe[6] = 0;
        oe[7] = 0;
        oe[8] = 0;
        oe[9] = 0;
        oe[10] = (far + near) * nf;
        oe[11] = -1;
        oe[12] = 0;
        oe[13] = 0;
        oe[14] = 2 * far * near * nf;
        oe[15] = 0;
    }
    /**
     * The specified matrix rotates around an arbitrary axis.
     * @param m - The specified matrix
     * @param axis - The axis
     * @param r - The rotation angle in radians
     * @param out - The rotated matrix
     */
    static rotateAxisAngle(m, axis, r, out) {
        let { _x: x, _y: y, _z: z } = axis;
        let len = Math.sqrt(x * x + y * y + z * z);
        if (Math.abs(len) < MathUtil.zeroTolerance) {
            return;
        }
        const me = m.elements;
        const oe = out.elements;
        let s, c, t;
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(r);
        c = Math.cos(r);
        t = 1 - c;
        let a11 = me[0], a12 = me[1], a13 = me[2], a14 = me[3];
        let a21 = me[4], a22 = me[5], a23 = me[6], a24 = me[7];
        let a31 = me[8], a32 = me[9], a33 = me[10], a34 = me[11];
        // Construct the elements of the rotation matrix
        let b11 = x * x * t + c;
        let b12 = y * x * t + z * s;
        let b13 = z * x * t - y * s;
        let b21 = x * y * t - z * s;
        let b22 = y * y * t + c;
        let b23 = z * y * t + x * s;
        let b31 = x * z * t + y * s;
        let b32 = y * z * t - x * s;
        let b33 = z * z * t + c;
        // Perform rotation-specific matrix multiplication
        oe[0] = a11 * b11 + a21 * b12 + a31 * b13;
        oe[1] = a12 * b11 + a22 * b12 + a32 * b13;
        oe[2] = a13 * b11 + a23 * b12 + a33 * b13;
        oe[3] = a14 * b11 + a24 * b12 + a34 * b13;
        oe[4] = a11 * b21 + a21 * b22 + a31 * b23;
        oe[5] = a12 * b21 + a22 * b22 + a32 * b23;
        oe[6] = a13 * b21 + a23 * b22 + a33 * b23;
        oe[7] = a14 * b21 + a24 * b22 + a34 * b23;
        oe[8] = a11 * b31 + a21 * b32 + a31 * b33;
        oe[9] = a12 * b31 + a22 * b32 + a32 * b33;
        oe[10] = a13 * b31 + a23 * b32 + a33 * b33;
        oe[11] = a14 * b31 + a24 * b32 + a34 * b33;
        if (m !== out) {
            // If the source and destination differ, copy the unchanged last row
            oe[12] = me[12];
            oe[13] = me[13];
            oe[14] = me[14];
            oe[15] = me[15];
        }
    }
    /**
     * Scale a matrix by a given vector.
     * @param m - The matrix
     * @param s - The given vector
     * @param out - The scaled matrix
     */
    static scale(m, s, out) {
        const me = m.elements;
        const oe = out.elements;
        const { _x: x, _y: y, _z: z } = s;
        oe[0] = me[0] * x;
        oe[1] = me[1] * x;
        oe[2] = me[2] * x;
        oe[3] = me[3] * x;
        oe[4] = me[4] * y;
        oe[5] = me[5] * y;
        oe[6] = me[6] * y;
        oe[7] = me[7] * y;
        oe[8] = me[8] * z;
        oe[9] = me[9] * z;
        oe[10] = me[10] * z;
        oe[11] = me[11] * z;
        oe[12] = me[12];
        oe[13] = me[13];
        oe[14] = me[14];
        oe[15] = me[15];
    }
    /**
     * Translate a matrix by a given vector.
     * @param m - The matrix
     * @param v - The given vector
     * @param out - The translated matrix
     */
    static translate(m, v, out) {
        const me = m.elements;
        const oe = out.elements;
        const { _x: x, _y: y, _z: z } = v;
        if (m === out) {
            oe[12] = me[0] * x + me[4] * y + me[8] * z + me[12];
            oe[13] = me[1] * x + me[5] * y + me[9] * z + me[13];
            oe[14] = me[2] * x + me[6] * y + me[10] * z + me[14];
            oe[15] = me[3] * x + me[7] * y + me[11] * z + me[15];
        }
        else {
            const a11 = me[0], a12 = me[1], a13 = me[2], a14 = me[3];
            const a21 = me[4], a22 = me[5], a23 = me[6], a24 = me[7];
            const a31 = me[8], a32 = me[9], a33 = me[10], a34 = me[11];
            (oe[0] = a11), (oe[1] = a12), (oe[2] = a13), (oe[3] = a14);
            (oe[4] = a21), (oe[5] = a22), (oe[6] = a23), (oe[7] = a24);
            (oe[8] = a31), (oe[9] = a32), (oe[10] = a33), (oe[11] = a34);
            oe[12] = a11 * x + a21 * y + a31 * z + me[12];
            oe[13] = a12 * x + a22 * y + a32 * z + me[13];
            oe[14] = a13 * x + a23 * y + a33 * z + me[14];
            oe[15] = a14 * x + a24 * y + a34 * z + me[15];
        }
    }
    /**
     * Calculate the transpose of the specified matrix.
     * @param a - The specified matrix
     * @param out - The transpose of the specified matrix
     */
    static transpose(a, out) {
        const ae = a.elements;
        const oe = out.elements;
        if (out === a) {
            const a12 = ae[1];
            const a13 = ae[2];
            const a14 = ae[3];
            const a23 = ae[6];
            const a24 = ae[7];
            const a34 = ae[11];
            oe[1] = ae[4];
            oe[2] = ae[8];
            oe[3] = ae[12];
            oe[4] = a12;
            oe[6] = ae[9];
            oe[7] = ae[13];
            oe[8] = a13;
            oe[9] = a23;
            oe[11] = ae[14];
            oe[12] = a14;
            oe[13] = a24;
            oe[14] = a34;
        }
        else {
            oe[0] = ae[0];
            oe[1] = ae[4];
            oe[2] = ae[8];
            oe[3] = ae[12];
            oe[4] = ae[1];
            oe[5] = ae[5];
            oe[6] = ae[9];
            oe[7] = ae[13];
            oe[8] = ae[2];
            oe[9] = ae[6];
            oe[10] = ae[10];
            oe[11] = ae[14];
            oe[12] = ae[3];
            oe[13] = ae[7];
            oe[14] = ae[11];
            oe[15] = ae[15];
        }
    }
    /**
     * An array containing the elements of the matrix (column matrix).
     * @remarks
     * elements[0] first column and first row value m11
     * elements[1] first column and second row value m12
     * elements[2] first column and third row value m13
     * elements[3] first column and fourth row value m14
     * elements[4] second column and first row value m21
     * and so on
     */
    elements = new Float32Array(16);
    /**
     * Constructor of 4x4 Matrix4.
     * @param m11 - default 1, column 1, row 1
     * @param m12 - default 0, column 1, row 2
     * @param m13 - default 0, column 1, row 3
     * @param m14 - default 0, column 1, row 4
     * @param m21 - default 0, column 2, row 1
     * @param m22 - default 1, column 2, row 2
     * @param m23 - default 0, column 2, row 3
     * @param m24 - default 0, column 2, row 4
     * @param m31 - default 0, column 3, row 1
     * @param m32 - default 0, column 3, row 2
     * @param m33 - default 1, column 3, row 3
     * @param m34 - default 0, column 3, row 4
     * @param m41 - default 0, column 4, row 1
     * @param m42 - default 0, column 4, row 2
     * @param m43 - default 0, column 4, row 3
     * @param m44 - default 1, column 4, row 4
     */
    constructor(m11 = 1, m12 = 0, m13 = 0, m14 = 0, m21 = 0, m22 = 1, m23 = 0, m24 = 0, m31 = 0, m32 = 0, m33 = 1, m34 = 0, m41 = 0, m42 = 0, m43 = 0, m44 = 1) {
        const e = this.elements;
        e[0] = m11;
        e[1] = m12;
        e[2] = m13;
        e[3] = m14;
        e[4] = m21;
        e[5] = m22;
        e[6] = m23;
        e[7] = m24;
        e[8] = m31;
        e[9] = m32;
        e[10] = m33;
        e[11] = m34;
        e[12] = m41;
        e[13] = m42;
        e[14] = m43;
        e[15] = m44;
    }
    /**
     * Set the value of this matrix, and return this matrix.
     * @param m11 - column 1, row 1
     * @param m12 - column 1, row 2
     * @param m13 - column 1, row 3
     * @param m14 - column 1, row 4
     * @param m21 - column 2, row 1
     * @param m22 - column 2, row 2
     * @param m23 - column 2, row 3
     * @param m24 - column 2, row 4
     * @param m31 - column 3, row 1
     * @param m32 - column 3, row 2
     * @param m33 - column 3, row 3
     * @param m34 - column 3, row 4
     * @param m41 - column 4, row 1
     * @param m42 - column 4, row 2
     * @param m43 - column 4, row 3
     * @param m44 - column 4, row 4
     * @returns This matrix
     */
    setValue(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        const e = this.elements;
        e[0] = m11;
        e[1] = m12;
        e[2] = m13;
        e[3] = m14;
        e[4] = m21;
        e[5] = m22;
        e[6] = m23;
        e[7] = m24;
        e[8] = m31;
        e[9] = m32;
        e[10] = m33;
        e[11] = m34;
        e[12] = m41;
        e[13] = m42;
        e[14] = m43;
        e[15] = m44;
        return this;
    }
    /**
     * Set the value of this matrix by an array.
     * @param array - The array
     * @param offset - The start offset of the array
     * @returns This matrix
     */
    setValueByArray(array, offset = 0) {
        const srce = this.elements;
        for (let i = 0; i < 16; i++) {
            srce[i] = array[i + offset];
        }
        return this;
    }
    /**
     * Clone the value of this matrix to an array.
     * @param out - The array
     * @param outOffset - The start offset of the array
     */
    toArray(out, outOffset = 0) {
        const e = this.elements;
        out[outOffset] = e[0];
        out[outOffset + 1] = e[1];
        out[outOffset + 2] = e[2];
        out[outOffset + 3] = e[3];
        out[outOffset + 4] = e[4];
        out[outOffset + 5] = e[5];
        out[outOffset + 6] = e[6];
        out[outOffset + 7] = e[7];
        out[outOffset + 8] = e[8];
        out[outOffset + 9] = e[9];
        out[outOffset + 10] = e[10];
        out[outOffset + 11] = e[11];
        out[outOffset + 12] = e[12];
        out[outOffset + 13] = e[13];
        out[outOffset + 14] = e[14];
        out[outOffset + 15] = e[15];
    }
    /**
     * Creates a clone of this matrix.
     * @returns A clone of this matrix
     */
    clone() {
        const e = this.elements;
        let ret = new Matrix4(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
        return ret;
    }
    /**
     * Clones this matrix to the specified matrix.
     * @param out - The specified matrix
     * @returns The specified matrix
     */
    cloneTo(out) {
        const e = this.elements;
        const oe = out.elements;
        oe[0] = e[0];
        oe[1] = e[1];
        oe[2] = e[2];
        oe[3] = e[3];
        oe[4] = e[4];
        oe[5] = e[5];
        oe[6] = e[6];
        oe[7] = e[7];
        oe[8] = e[8];
        oe[9] = e[9];
        oe[10] = e[10];
        oe[11] = e[11];
        oe[12] = e[12];
        oe[13] = e[13];
        oe[14] = e[14];
        oe[15] = e[15];
        return out;
    }
    /**
     * Determines the product of this matrix and the specified matrix.
     * @param right - The specified matrix
     * @returns This matrix that store the product of the two matrices
     */
    multiply(right) {
        Matrix4.multiply(this, right, this);
        return this;
    }
    /**
     * Calculate a determinant of this matrix.
     * @returns The determinant of this matrix
     */
    determinant() {
        const e = this.elements;
        const a11 = e[0], a12 = e[1], a13 = e[2], a14 = e[3];
        const a21 = e[4], a22 = e[5], a23 = e[6], a24 = e[7];
        const a31 = e[8], a32 = e[9], a33 = e[10], a34 = e[11];
        const a41 = e[12], a42 = e[13], a43 = e[14], a44 = e[15];
        const b00 = a11 * a22 - a12 * a21;
        const b01 = a11 * a23 - a13 * a21;
        const b02 = a11 * a24 - a14 * a21;
        const b03 = a12 * a23 - a13 * a22;
        const b04 = a12 * a24 - a14 * a22;
        const b05 = a13 * a24 - a14 * a23;
        const b06 = a31 * a42 - a32 * a41;
        const b07 = a31 * a43 - a33 * a41;
        const b08 = a31 * a44 - a34 * a41;
        const b09 = a32 * a43 - a33 * a42;
        const b10 = a32 * a44 - a34 * a42;
        const b11 = a33 * a44 - a34 * a43;
        // Calculate the determinant
        return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
    }
    /**
     * Decompose this matrix to translation, rotation and scale elements.
     * @param translation - Translation vector as an output parameter
     * @param rotation - Rotation quaternion as an output parameter
     * @param scale - Scale vector as an output parameter
     * @returns True if this matrix can be decomposed, false otherwise
     */
    decompose(translation, rotation, scale) {
        const rm = Matrix4._tempMat30;
        const e = this.elements;
        const rme = rm.elements;
        const m11 = e[0];
        const m12 = e[1];
        const m13 = e[2];
        const m14 = e[3];
        const m21 = e[4];
        const m22 = e[5];
        const m23 = e[6];
        const m24 = e[7];
        const m31 = e[8];
        const m32 = e[9];
        const m33 = e[10];
        const m34 = e[11];
        translation.setValue(e[12], e[13], e[14]);
        const xs = Math.sign(m11 * m12 * m13 * m14) < 0 ? -1 : 1;
        const ys = Math.sign(m21 * m22 * m23 * m24) < 0 ? -1 : 1;
        const zs = Math.sign(m31 * m32 * m33 * m34) < 0 ? -1 : 1;
        const sx = xs * Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
        const sy = ys * Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
        const sz = zs * Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
        scale.setValue(sx, sy, sz);
        if (Math.abs(sx) < MathUtil.zeroTolerance ||
            Math.abs(sy) < MathUtil.zeroTolerance ||
            Math.abs(sz) < MathUtil.zeroTolerance) {
            rotation.identity();
            return false;
        }
        else {
            const invSX = 1 / sx;
            const invSY = 1 / sy;
            const invSZ = 1 / sz;
            rme[0] = m11 * invSX;
            rme[1] = m12 * invSX;
            rme[2] = m13 * invSX;
            rme[3] = m21 * invSY;
            rme[4] = m22 * invSY;
            rme[5] = m23 * invSY;
            rme[6] = m31 * invSZ;
            rme[7] = m32 * invSZ;
            rme[8] = m33 * invSZ;
            Quaternion.rotationMatrix3x3(rm, rotation);
            return true;
        }
    }
    /**
     * Get rotation from this matrix.
     * @param out - Rotation quaternion as an output parameter
     * @returns The out
     */
    getRotation(out) {
        const e = this.elements;
        let trace = e[0] + e[5] + e[10];
        if (trace > MathUtil.zeroTolerance) {
            let s = Math.sqrt(trace + 1.0) * 2;
            out._w = 0.25 * s;
            out._x = (e[6] - e[9]) / s;
            out._y = (e[8] - e[2]) / s;
            out._z = (e[1] - e[4]) / s;
        }
        else if (e[0] > e[5] && e[0] > e[10]) {
            let s = Math.sqrt(1.0 + e[0] - e[5] - e[10]) * 2;
            out._w = (e[6] - e[9]) / s;
            out._x = 0.25 * s;
            out._y = (e[1] + e[4]) / s;
            out._z = (e[8] + e[2]) / s;
        }
        else if (e[5] > e[10]) {
            let s = Math.sqrt(1.0 + e[5] - e[0] - e[10]) * 2;
            out._w = (e[8] - e[2]) / s;
            out._x = (e[1] + e[4]) / s;
            out._y = 0.25 * s;
            out._z = (e[6] + e[9]) / s;
        }
        else {
            let s = Math.sqrt(1.0 + e[10] - e[0] - e[5]) * 2;
            out._w = (e[1] - e[4]) / s;
            out._x = (e[8] + e[2]) / s;
            out._y = (e[6] + e[9]) / s;
            out._z = 0.25 * s;
        }
        out._onValueChanged && out._onValueChanged();
        return out;
    }
    /**
     * Get scale from this matrix.
     * @param out - Scale vector as an output parameter
     * @returns The out
     */
    getScaling(out) {
        //getScale()
        const e = this.elements;
        const m11 = e[0], m12 = e[1], m13 = e[2];
        const m21 = e[4], m22 = e[5], m23 = e[6];
        const m31 = e[8], m32 = e[9], m33 = e[10];
        out.setValue(Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13), Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23), Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33));
        return out;
    }
    /**
     * Get translation from this matrix.
     * @param out - Translation vector as an output parameter
     * @returns The out
     */
    getTranslation(out) {
        const e = this.elements;
        out.setValue(e[12], e[13], e[14]);
        return out;
    }
    /**
     * Identity this matrix.
     * @returns This matrix after identity
     */
    identity() {
        const e = this.elements;
        e[0] = 1;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
        e[4] = 0;
        e[5] = 1;
        e[6] = 0;
        e[7] = 0;
        e[8] = 0;
        e[9] = 0;
        e[10] = 1;
        e[11] = 0;
        e[12] = 0;
        e[13] = 0;
        e[14] = 0;
        e[15] = 1;
        return this;
    }
    /**
     * Invert the matrix.
     * @returns The matrix after invert
     */
    invert() {
        Matrix4.invert(this, this);
        return this;
    }
    /**
     * This matrix rotates around an arbitrary axis.
     * @param axis - The axis
     * @param r - The rotation angle in radians
     * @returns This matrix after rotate
     */
    rotateAxisAngle(axis, r) {
        Matrix4.rotateAxisAngle(this, axis, r, this);
        return this;
    }
    /**
     * Scale this matrix by a given vector.
     * @param s - The given vector
     * @returns This matrix after scale
     */
    scale(s) {
        Matrix4.scale(this, s, this);
        return this;
    }
    /**
     * Translate this matrix by a given vector.
     * @param v - The given vector
     * @returns This matrix after translate
     */
    translate(v) {
        Matrix4.translate(this, v, this);
        return this;
    }
    /**
     * Calculate the transpose of this matrix.
     * @returns This matrix after transpose
     */
    transpose() {
        Matrix4.transpose(this, this);
        return this;
    }
}

/**
 * Describes a color in the from of RGBA (in order: R, G, B, A).
 */
class Color {
    /**
     * Modify a value from the gamma space to the linear space.
     * @param value - The value in gamma space
     * @returns The value in linear space
     */
    static gammaToLinearSpace(value) {
        // https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_framebuffer_sRGB.txt
        // https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_texture_sRGB_decode.txt
        if (value <= 0.0)
            return 0.0;
        else if (value <= 0.04045)
            return value / 12.92;
        else if (value < 1.0)
            return Math.pow((value + 0.055) / 1.055, 2.4);
        else
            return Math.pow(value, 2.4);
    }
    /**
     * Modify a value from the linear space to the gamma space.
     * @param value - The value in linear space
     * @returns The value in gamma space
     */
    static linearToGammaSpace(value) {
        // https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_framebuffer_sRGB.txt
        // https://www.khronos.org/registry/OpenGL/extensions/EXT/EXT_texture_sRGB_decode.txt
        if (value <= 0.0)
            return 0.0;
        else if (value < 0.0031308)
            return 12.92 * value;
        else if (value < 1.0)
            return 1.055 * Math.pow(value, 0.41666) - 0.055;
        else
            return Math.pow(value, 0.41666);
    }
    /**
     * Determines whether the specified colors are equals.
     * @param left - The first color to compare
     * @param right - The second color to compare
     * @returns True if the specified colors are equals, false otherwise
     */
    static equals(left, right) {
        return (MathUtil.equals(left.r, right.r) &&
            MathUtil.equals(left.g, right.g) &&
            MathUtil.equals(left.b, right.b) &&
            MathUtil.equals(left.a, right.a));
    }
    /**
     * Determines the sum of two colors.
     * @param left - The first color to add
     * @param right - The second color to add
     * @param out - The sum of two colors
     * @returns The added color
     */
    static add(left, right, out) {
        out.r = left.r + right.r;
        out.g = left.g + right.g;
        out.b = left.b + right.b;
        out.a = left.a + right.a;
        return out;
    }
    /**
     * Scale a color by the given value.
     * @param left - The color to scale
     * @param s - The amount by which to scale the color
     * @param out - The scaled color
     * @returns The scaled color
     */
    static scale(left, s, out) {
        out.r = left.r * s;
        out.g = left.g * s;
        out.b = left.b * s;
        out.a = left.a * s;
        return out;
    }
    /** The red component of the color, 0~1. */
    r;
    /** The green component of the color, 0~1. */
    g;
    /** The blue component of the color, 0~1. */
    b;
    /** The alpha component of the color, 0~1. */
    a;
    /**
     * Constructor of Color.
     * @param r - The red component of the color
     * @param g - The green component of the color
     * @param b - The blue component of the color
     * @param a - The alpha component of the color
     */
    constructor(r = 1, g = 1, b = 1, a = 1) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }
    /**
     * Set the value of this color.
     * @param r - The red component of the color
     * @param g - The green component of the color
     * @param b - The blue component of the color
     * @param a - The alpha component of the color
     * @returns This color.
     */
    setValue(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        return this;
    }
    /**
     * Determines the sum of this color and the specified color.
     * @param color - The specified color
     * @returns The added color
     */
    add(color) {
        this.r += color.r;
        this.g += color.g;
        this.b += color.b;
        this.a += color.a;
        return this;
    }
    /**
     * Scale this color by the given value.
     * @param s - The amount by which to scale the color
     * @returns The scaled color
     */
    scale(s) {
        this.r *= s;
        this.g *= s;
        this.b *= s;
        this.a *= s;
        return this;
    }
    /**
     * Creates a clone of this color.
     * @returns A clone of this color
     */
    clone() {
        const ret = new Color(this.r, this.g, this.b, this.a);
        return ret;
    }
    /**
     * Clones this color to the specified color.
     * @param out - The specified color
     * @returns The specified color
     */
    cloneTo(out) {
        out.r = this.r;
        out.g = this.g;
        out.b = this.b;
        out.a = this.a;
        return out;
    }
    /**
     * Modify components (r, g, b) of this color from gamma space to linear space.
     * @param out - The color in linear space
     * @returns The color in linear space
     */
    toLinear(out) {
        out.r = Color.gammaToLinearSpace(this.r);
        out.g = Color.gammaToLinearSpace(this.g);
        out.b = Color.gammaToLinearSpace(this.b);
        return out;
    }
    /**
     * Modify components (r, g, b) of this color from linear space to gamma space.
     * @param out - The color in gamma space
     * @returns The color in gamma space
     */
    toGamma(out) {
        out.r = Color.linearToGammaSpace(this.r);
        out.g = Color.linearToGammaSpace(this.g);
        out.b = Color.linearToGammaSpace(this.b);
        return out;
    }
}

/**
 * Enum type for background mode.
 */
var BackgroundMode;
(function (BackgroundMode) {
    /* Solid color. */
    BackgroundMode[BackgroundMode["SolidColor"] = 0] = "SolidColor";
    /* Sky. */
    BackgroundMode[BackgroundMode["Sky"] = 1] = "Sky";
    /** Texture */
    BackgroundMode[BackgroundMode["Texture"] = 2] = "Texture";
})(BackgroundMode || (BackgroundMode = {}));

/**
 * Color Space.
 */
var ColorSpace;
(function (ColorSpace) {
    /** Linear color space. */
    ColorSpace[ColorSpace["Linear"] = 0] = "Linear";
    /** Gamma color space. */
    ColorSpace[ColorSpace["Gamma"] = 1] = "Gamma";
})(ColorSpace || (ColorSpace = {}));

/**
 * The encapsulation of each uniform variable, including its cache value, data upload method, and data storage address.
 */
class ShaderUniform {
    name;
    propertyId;
    location;
    applyFunc;
    cacheValue;
    textureIndex;
    textureDefault;
    _gl;
    _colorSpace;
    constructor(gl) {
        this._gl = gl;
    }
    upload1f(shaderUniform, value) {
        if (this.cacheValue !== value) {
            this._gl.uniform1f(shaderUniform.location, value);
            this.cacheValue = value;
        }
    }
    upload1fv(shaderUniform, value) {
        this._gl.uniform1fv(shaderUniform.location, value);
    }
    upload2fv(shaderUniform, value) {
        this._gl.uniform2fv(shaderUniform.location, value);
    }
    upload3f(shaderUniform, value) {
        const cacheValue = this.cacheValue;
        if (value.r !== undefined) {
            if (cacheValue.x !== value.r || cacheValue.y !== value.g || cacheValue.z !== value.b) {
                if (this._colorSpace === ColorSpace.Linear) {
                    this._gl.uniform3f(shaderUniform.location, Color.gammaToLinearSpace(value.r), Color.gammaToLinearSpace(value.g), Color.gammaToLinearSpace(value.b));
                }
                else {
                    this._gl.uniform3f(shaderUniform.location, value.r, value.g, value.b);
                }
                cacheValue.x = value.r;
                cacheValue.y = value.g;
                cacheValue.z = value.b;
            }
        }
        else {
            if (cacheValue.x !== value.x ||
                cacheValue.y !== value.y ||
                cacheValue.z !== value.z) {
                this._gl.uniform3f(shaderUniform.location, value.x, value.y, value.z);
                cacheValue.x = value.x;
                cacheValue.y = value.y;
                cacheValue.z = value.z;
            }
        }
    }
    upload3fv(shaderUniform, value) {
        this._gl.uniform3fv(shaderUniform.location, value);
    }
    upload4fv(shaderUniform, value) {
        this._gl.uniform4fv(shaderUniform.location, value);
    }
    upload1i(shaderUniform, value) {
        if (this.cacheValue !== value) {
            this._gl.uniform1i(shaderUniform.location, value);
            this.cacheValue = value;
        }
    }
    upload1iv(shaderUniform, value) {
        this._gl.uniform1iv(shaderUniform.location, value);
    }
    upload2iv(shaderUniform, value) {
        this._gl.uniform2iv(shaderUniform.location, value);
    }
    upload3iv(shaderUniform, value) {
        this._gl.uniform3iv(shaderUniform.location, value);
    }
    upload4iv(shaderUniform, value) {
        this._gl.uniform4iv(shaderUniform.location, value);
    }
    uploadMat4(shaderUniform, value) {
        this._gl.uniformMatrix4fv(shaderUniform.location, false, value.elements);
    }
    uploadMat4v(shaderUniform, value) {
        this._gl.uniformMatrix4fv(shaderUniform.location, false, value);
    }
    uploadTexture(shaderUniform, value) {
        // 开启第x号纹理单元
        this._gl.activeTexture(shaderUniform.textureIndex);
        // 向target绑定纹理对象
        this._gl.bindTexture(value._glTarget, value._glTexture);
    }
}

/**
 * Shader data grouping.
 */
var ShaderDataGroup;
(function (ShaderDataGroup) {
    /** Scene group. */
    ShaderDataGroup[ShaderDataGroup["Scene"] = 0] = "Scene";
    /** Camera group. */
    ShaderDataGroup[ShaderDataGroup["Camera"] = 1] = "Camera";
    /** Renderer group. */
    ShaderDataGroup[ShaderDataGroup["Renderer"] = 2] = "Renderer";
    /** material group. */
    ShaderDataGroup[ShaderDataGroup["Material"] = 3] = "Material";
    // TODO: Geographic
})(ShaderDataGroup || (ShaderDataGroup = {}));

/**
 * Shader uniform block.
 * @internal
 */
class ShaderUniformBlock {
    constUniforms = [];
    textureUniforms = [];
}

/**
 * Renderer, each Mesh will have a renderer instance.
 */
class Renderer {
    /** Current bind program. */
    static glProgram;
    // TODO: 要接入webgl2, 应该抽出一个类型
    gl;
    /** Array of addresses of attribute variables in shader programs. */
    attribLocArray;
    /** Mesh to be rendered. */
    _primitive;
    /**
     * Render based on rendering context and grid.
     * @param gl WebGL rendering context.
     * @param primitive Mesh to be rendered.
     */
    constructor(gl, primitive) {
        this._primitive = primitive;
        this.gl = gl;
        this.initRenderState();
    }
    /**
     * Bind buffer and attribute.
     */
    bindBufferAndAttrib(shaderProgram) {
        const gl = this.gl;
        const primitive = this._primitive;
        const vertexBufferBindings = primitive._vertexBufferBindings;
        this.attribLocArray = [];
        const attributeLocation = shaderProgram.attributeLocation;
        const attributes = primitive._vertexElementMap;
        let vbo;
        let lastBoundVbo;
        for (const name in attributeLocation) {
            const loc = attributeLocation[name];
            if (loc === -1)
                continue;
            const element = attributes[name];
            if (element) {
                const { buffer, stride } = vertexBufferBindings[element.bindingIndex];
                vbo = buffer._nativeBuffer;
                if (lastBoundVbo !== vbo) {
                    lastBoundVbo = vbo;
                    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
                }
                gl.enableVertexAttribArray(loc);
                const { size, type, normalized } = element._glElementInfo;
                // gl.vertexAttribPointer(loc, size, type, normalized, 0, element.offset);
                gl.vertexAttribPointer(loc, size, type, normalized, stride, element.offset);
                this.attribLocArray.push(loc);
            }
            else {
                console.warn('vertex attribute not found: ' + name);
            }
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }
    // TODO: 这个渲染状态是不是应该考虑放到材质里面，并且抽出一个RenderState
    /**
     * Clear depth, color buffer, etc.
     */
    initRenderState() {
        const gl = this.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }
    /**
     * Draw the primitive.
     */
    draw(shaderProgram, subMesh) {
        const gl = this.gl;
        const primitive = this._primitive;
        this.bindBufferAndAttrib(shaderProgram);
        const { _indexBufferBinding, _instanceCount, _glIndexType, _glIndexByteCount } = primitive;
        const { topology, start, count } = subMesh;
        if (!_instanceCount) {
            if (_indexBufferBinding) {
                const { _nativeBuffer } = _indexBufferBinding.buffer;
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _nativeBuffer);
                gl.drawElements(topology, count, _glIndexType, start * _glIndexByteCount);
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            }
            else {
                gl.drawArrays(topology, start, count);
            }
        }
    }
}

/**
 * Shader program, corresponding to the GPU shader program.
 */
class ShaderProgram {
    /** Shader program counter. */
    static _counter = 0;
    /** Shader program id. */
    id;
    sceneUniformBlock = new ShaderUniformBlock();
    cameraUniformBlock = new ShaderUniformBlock();
    rendererUniformBlock = new ShaderUniformBlock();
    materialUniformBlock = new ShaderUniformBlock();
    otherUniformBlock = new ShaderUniformBlock();
    /** Attribute variable location in webgl. */
    attributeLocation = Object.create(null);
    _isValid;
    _engine;
    _gl;
    _vertexShader;
    _fragmentShader;
    _glProgram;
    // 当前激活的纹理单元
    /** Currently active texture unit. */
    _activeTextureUint = 0;
    /** WebGL program. */
    get glProgram() {
        return this._glProgram;
    }
    /**
     * Whether this shader program is valid.
     */
    get isValid() {
        return this._isValid;
    }
    constructor(engine, vertexSource, fragmentSource) {
        this._engine = engine;
        this._gl = engine.gl;
        this._glProgram = this._createProgram(vertexSource, fragmentSource);
        // ! bind不应该放在constructor里面
        this.bind();
        if (this._glProgram) {
            this._isValid = true;
            this._recordLocation();
        }
        else {
            this._isValid = false;
        }
        this.id = ShaderProgram._counter++;
    }
    /**
     * Create a webgl program instance.
     * @param vertexSource Vertex source code.
     * @param fragmentSource Fragment source code.
     * @returns WebGL program.
     */
    _createProgram(vertexSource, fragmentSource) {
        const gl = this._gl;
        // create and compile shader
        const vertexShader = this._createShader(gl.VERTEX_SHADER, vertexSource);
        if (!vertexShader) {
            return null;
        }
        const fragmentShader = this._createShader(gl.FRAGMENT_SHADER, fragmentSource);
        if (!fragmentShader) {
            return null;
        }
        // link program and shader
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.validateProgram(program);
        if (gl.isContextLost()) {
            console.error('Context lost while linking program.');
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            return null;
        }
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Could not link WebGL program. \n' + gl.getProgramInfoLog(program));
            gl.deleteProgram(program);
            return null;
        }
        this._vertexShader = vertexShader;
        this._fragmentShader = fragmentShader;
        return program;
    }
    /**
     * Create and compile shader.
     * @param shaderType Fragment shader code or vertex shader code.
     * @param shaderSource Fragment shader source code or vertex shader source code.
     * @returns WebGLShader | null
     */
    _createShader(shaderType, shaderSource) {
        const gl = this._gl;
        const shader = gl.createShader(shaderType);
        if (!shader) {
            console.error('Context lost while create shader.');
            return null;
        }
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        if (gl.isContextLost()) {
            console.error('Context lost while compiling shader.');
            gl.deleteShader(shader);
            return null;
        }
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(`Could not compile WebGL shader.\n${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }
    // 将纹理数据或者uniform数据推入对应组的block
    /**
     * Push texture data or uniform data into the block of the corresponding group.
     * @param uniform Shader uniform.
     * @param group Shader data group: Scene, Camera, Renderer and Material.
     * @param isTexture Is it a texture or a uniform variable.
     */
    _groupingUniform(uniform, group, isTexture) {
        switch (group) {
            case ShaderDataGroup.Scene:
                if (isTexture) {
                    this.sceneUniformBlock.textureUniforms.push(uniform);
                }
                else {
                    this.sceneUniformBlock.constUniforms.push(uniform);
                }
                break;
            case ShaderDataGroup.Camera:
                if (isTexture) {
                    this.cameraUniformBlock.textureUniforms.push(uniform);
                }
                else {
                    this.cameraUniformBlock.constUniforms.push(uniform);
                }
                break;
            case ShaderDataGroup.Renderer:
                if (isTexture) {
                    this.rendererUniformBlock.textureUniforms.push(uniform);
                }
                else {
                    this.rendererUniformBlock.constUniforms.push(uniform);
                }
                break;
            case ShaderDataGroup.Material:
                if (isTexture) {
                    this.materialUniformBlock.textureUniforms.push(uniform);
                }
                else {
                    this.materialUniformBlock.constUniforms.push(uniform);
                }
                break;
            default:
                if (isTexture) {
                    this.otherUniformBlock.textureUniforms.push(uniform);
                }
                else {
                    this.otherUniformBlock.constUniforms.push(uniform);
                }
        }
    }
    /**
     * Record the location of uniform/attribute.
     */
    _recordLocation() {
        const gl = this._gl;
        const program = this._glProgram;
        const uniformInfos = this._getUniformInfos();
        const attributeInfos = this._getAttributeInfos();
        uniformInfos.forEach(({ name, size, type }) => {
            const shaderUniform = new ShaderUniform(gl);
            let isArray = false;
            let isTexture = false;
            if (name.indexOf('[0]') > 0) {
                name = name.substr(0, name.length - 3);
                isArray = true;
            }
            const group = Shader._getShaderPropertyGroup(name);
            const location = gl.getUniformLocation(program, name);
            shaderUniform.name = name;
            shaderUniform.propertyId = Shader.getPropertyByName(name)._uniqueId;
            shaderUniform.location = location;
            switch (type) {
                case gl.FLOAT:
                    if (isArray) {
                        shaderUniform.applyFunc = shaderUniform.upload1fv;
                    }
                    else {
                        shaderUniform.applyFunc = shaderUniform.upload1f;
                        shaderUniform.cacheValue = 0;
                    }
                    break;
                case gl.FLOAT_VEC2:
                    if (isArray) {
                        shaderUniform.applyFunc = shaderUniform.upload2fv;
                    }
                    break;
                case gl.FLOAT_VEC3:
                    // TODO: 这里要考虑数组的情况
                    shaderUniform.applyFunc = shaderUniform.upload3fv;
                    break;
                case gl.FLOAT_VEC4:
                    if (isArray) {
                        shaderUniform.applyFunc = shaderUniform.upload4fv;
                    }
                    break;
                case gl.INT:
                    if (isArray) {
                        shaderUniform.applyFunc = shaderUniform.upload1iv;
                    }
                    else {
                        shaderUniform.applyFunc = shaderUniform.upload1i;
                        shaderUniform.cacheValue = 0;
                    }
                    break;
                case gl.INT_VEC2:
                    if (isArray) {
                        shaderUniform.applyFunc = shaderUniform.upload2iv;
                    }
                    break;
                case gl.INT_VEC4:
                    if (isArray) {
                        shaderUniform.applyFunc = shaderUniform.upload4iv;
                    }
                    break;
                case gl.FLOAT_MAT4:
                    shaderUniform.applyFunc = isArray ? shaderUniform.uploadMat4v : shaderUniform.uploadMat4;
                    break;
                case gl.SAMPLER_2D:
                case gl.SAMPLER_CUBE:
                    let defaultTexture;
                    switch (type) {
                        case gl.SAMPLER_2D:
                            defaultTexture = this._engine._whiteTexture2D;
                            break;
                        case gl.SAMPLER_CUBE:
                            defaultTexture = this._engine._whiteTextureCube;
                            break;
                        default:
                            throw new Error('Unsupported texture type.');
                    }
                    isTexture = true;
                    const textureIndex = gl.TEXTURE0 + this._activeTextureUint;
                    shaderUniform.textureDefault = defaultTexture;
                    shaderUniform.textureIndex = textureIndex;
                    shaderUniform.applyFunc = shaderUniform.uploadTexture;
                    gl.uniform1i(location, this._activeTextureUint++);
                    shaderUniform.uploadTexture(shaderUniform, defaultTexture);
            }
            this._groupingUniform(shaderUniform, group, isTexture);
        });
        attributeInfos.forEach(({ name }) => {
            this.attributeLocation[name] = gl.getAttribLocation(program, name);
        });
    }
    /**
     * Get the address of the active uniform variable in the current webgl program.
     * @returns Array of uniform variable addresses.
     */
    _getUniformInfos() {
        const gl = this._gl;
        const program = this._glProgram;
        const uniformInfos = new Array();
        const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; ++i) {
            const info = gl.getActiveUniform(program, i);
            uniformInfos[i] = info;
        }
        return uniformInfos;
    }
    /**
     * Get the address of the active attribute variable in the current webgl program.
     * @returns Array of attribute variable addresses.
     */
    _getAttributeInfos() {
        const gl = this._gl;
        const program = this._glProgram;
        const attributeInfos = new Array();
        const attributeCount = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; ++i) {
            const info = gl.getActiveAttrib(program, i);
            attributeInfos[i] = info;
        }
        return attributeInfos;
    }
    /**
     * Upload all shader data in shader uniform block.
     * @param uniformBlock - shader Uniform block
     * @param shaderData - shader data
     */
    uploadAll(uniformBlock, shaderData) {
        this.uploadUniforms(uniformBlock, shaderData);
        this.uploadTextures(uniformBlock, shaderData);
    }
    /**
     * Upload constant shader data in shader uniform block.
     * @param uniformBlock - shader Uniform block
     * @param shaderData - shader data
     */
    uploadUniforms(uniformBlock, shaderData) {
        // shaderData._properties是根据shaderproperty的id的值的哈希表
        // 因为以数字为键效率更高
        const properties = shaderData._properties;
        const constUniforms = uniformBlock.constUniforms;
        for (let i = 0, n = constUniforms.length; i < n; i++) {
            const uniform = constUniforms[i];
            const data = properties[uniform.propertyId];
            // ! Highlight: 这里相当于把CPU中的值分配给GPU
            data != null && uniform.applyFunc(uniform, data);
        }
    }
    /**
     * Upload texture shader data in shader uniform block.
     * @param uniformBlock - shader Uniform block
     * @param shaderData - shader data
     */
    uploadTextures(uniformBlock, shaderData) {
        const properties = shaderData._properties;
        const textureUniforms = uniformBlock.textureUniforms;
        // textureUniforms property maybe null if ShaderUniformBlock not contain any texture.
        if (textureUniforms) {
            for (let i = 0, n = textureUniforms.length; i < n; i++) {
                const uniform = textureUniforms[i];
                const texture = properties[uniform.propertyId];
                if (texture) {
                    uniform.applyFunc(uniform, texture);
                }
                else {
                    uniform.applyFunc(uniform, uniform.textureDefault);
                }
            }
        }
    }
    /**
     * Bind this shader program.
     * @returns Whether the shader program is switched.
     */
    bind() {
        if (Renderer.glProgram !== this) {
            this._gl.useProgram(this._glProgram);
            Renderer.glProgram = this;
            return true;
        }
        else {
            return false;
        }
    }
    destroy() {
        const gl = this._gl;
        this._vertexShader && gl.deleteShader(this._vertexShader);
        this._fragmentShader && gl.deleteShader(this._fragmentShader);
        this._glProgram && gl.deleteProgram(this._glProgram);
    }
}

/**
 * Shader property.
 */
class ShaderProperty {
    static _propertyNameCounter = 0;
    /** @internal */
    _uniqueId;
    /** @internal */
    _group;
    /** Shader property name. */
    name;
    /**
     * @internal
     */
    constructor(name) {
        this.name = name;
        this._uniqueId = ShaderProperty._propertyNameCounter++;
    }
}

/**
 * Shader containing vertex and fragment source.
 */
class Shader {
    /** Shader counter. */
    static _shaderCounter = 0;
    /** Shader map. */
    static _shaderMap = Object.create(null);
    /** Shader counter. */
    static _propertyNameMap = Object.create(null);
    /** The name of shader. */
    name;
    /** @internal */
    _shaderId = 0;
    /** Vertex shader source. */
    _vertexSource;
    /** Fragment shader source. */
    _fragmentSource;
    constructor(name, vertexSource, fragmentSource) {
        this._shaderId = Shader._shaderCounter++;
        this.name = name;
        this._vertexSource = vertexSource;
        this._fragmentSource = fragmentSource;
    }
    /**
     * @internal
     */
    static _getShaderPropertyGroup(propertyName) {
        const shaderProperty = Shader._propertyNameMap[propertyName];
        return shaderProperty?._group;
    }
    // 不存在就创建一个
    /**
     * Get shader property by name.
     * @param name - Name of the shader property
     * @returns Shader property
     */
    static getPropertyByName(name) {
        const propertyNameMap = Shader._propertyNameMap;
        if (propertyNameMap[name] != null) {
            return propertyNameMap[name];
        }
        else {
            // 实例化的时候并不分配分组，即此时property还没有group属性
            const property = new ShaderProperty(name);
            propertyNameMap[name] = property;
            return property;
        }
    }
    /**
     * Create a shader.
     * @param name - Name of the shader.
     * @param vertexSource - Vertex source code.
     * @param fragmentSource - Fragment source code.
     */
    static create(name, vertexSource, fragmentSource) {
        const shaderMap = Shader._shaderMap;
        if (shaderMap[name]) {
            throw `Shader named "${name}" already exists.`;
        }
        return (shaderMap[name] = new Shader(name, vertexSource, fragmentSource));
    }
    /**
     * Find a shader by name.
     * @param name - Name of the shader
     */
    static find(name) {
        return Shader._shaderMap[name];
    }
    /**
     * Create program based on shader.
     * @param engine
     * @returns Shader program.
     */
    _getShaderProgram(engine) {
        // 将来可能在这里拼接glsl
        const vertexSource = this._vertexSource;
        const fragmentSource = this._fragmentSource;
        return new ShaderProgram(engine, vertexSource, fragmentSource);
    }
}

class ShaderData {
    _group;
    _properties = Object.create(null);
    constructor(group) {
        this._group = group;
    }
    getFloat(property) {
        return this._getData(property);
    }
    setFloat(property, value) {
        this._setData(property, value);
    }
    getInt(property) {
        return this._getData(property);
    }
    setInt(property, value) {
        this._setData(property, value);
    }
    getFloatArray(property) {
        return this._getData(property);
    }
    setFloatArray(property, value) {
        this._setData(property, value);
    }
    getIntArray(property) {
        return this._getData(property);
    }
    setIntArray(property, value) {
        this._setData(property, value);
    }
    getVector2(property) {
        return this._getData(property);
    }
    setVector2(property, value) {
        this._setData(property, value);
    }
    getVector3(property) {
        return this._getData(property);
    }
    setVector3(property, value) {
        this._setData(property, value);
    }
    getVector4(property) {
        return this._getData(property);
    }
    setVector4(property, value) {
        this._setData(property, value);
    }
    getMatrix(property) {
        return this._getData(property);
    }
    setMatrix(property, value) {
        this._setData(property, value);
    }
    _getData(property) {
        if (typeof property === 'string') {
            property = Shader.getPropertyByName(property);
        }
        return this._properties[property._uniqueId];
    }
    getTexture(property) {
        return this._getData(property);
    }
    setTexture(property, value) {
        this._setData(property, value);
    }
    // 设置数据的时候顺便指定了分组！！！
    _setData(property, value) {
        if (typeof property === 'string') {
            property = Shader.getPropertyByName(property);
        }
        if (property._group !== this._group) {
            if (property._group === undefined) {
                property._group = this._group;
            }
            else {
                throw `Shader property ${property.name} has been used as ${ShaderDataGroup[property._group]} property.`;
            }
        }
        this._properties[property._uniqueId] = value;
    }
}

/**
 * Material base class.
 */
class Material {
    /** Name. */
    name;
    /** Shader used by the material. */
    shader;
    // TODO: 提升一个RefObject!
    engine;
    /** Shader data. */
    shaderData = new ShaderData(ShaderDataGroup.Material);
    constructor(engine, shader) {
        this.shader = shader;
        this.engine = engine;
    }
}

/**
 * Texture format enumeration.
 */
var TextureFormat;
(function (TextureFormat) {
    /** RGB format,8 bits per channel. */
    TextureFormat[TextureFormat["R8G8B8"] = 0] = "R8G8B8";
    /** RGBA format,8 bits per channel. */
    TextureFormat[TextureFormat["R8G8B8A8"] = 1] = "R8G8B8A8";
    /** RGBA format,4 bits per channel. */
    TextureFormat[TextureFormat["R4G4B4A4"] = 2] = "R4G4B4A4";
    /** RGBA format,5 bits in R channel,5 bits in G channel,5 bits in B channel, 1 bit in A channel. */
    TextureFormat[TextureFormat["R5G5B5A1"] = 3] = "R5G5B5A1";
    /** RGB format,5 bits in R channel,6 bits in G channel,5 bits in B channel. */
    TextureFormat[TextureFormat["R5G6B5"] = 4] = "R5G6B5";
    /** Transparent format,8 bits. */
    TextureFormat[TextureFormat["Alpha8"] = 5] = "Alpha8";
    /** Luminance/alpha in RGB channel, alpha in A channel. */
    TextureFormat[TextureFormat["LuminanceAlpha"] = 6] = "LuminanceAlpha";
    /** RGBA format,16 bits per channel. */
    TextureFormat[TextureFormat["R16G16B16A16"] = 7] = "R16G16B16A16";
    /** RGBA format,32 bits per channel. */
    TextureFormat[TextureFormat["R32G32B32A32"] = 8] = "R32G32B32A32";
    /** RGB compressed format。*/
    TextureFormat[TextureFormat["DXT1"] = 9] = "DXT1";
    /** RGBA compressed format。*/
    TextureFormat[TextureFormat["DXT5"] = 10] = "DXT5";
    /** RGB compressed format,4 bits per pixel。*/
    TextureFormat[TextureFormat["ETC1_RGB"] = 11] = "ETC1_RGB";
    /** RGB compressed format,4 bits per pixel。*/
    TextureFormat[TextureFormat["ETC2_RGB"] = 12] = "ETC2_RGB";
    /** RGBA compressed format,5 bits per pixel,4 bit in RGB, 1 bit in A. */
    TextureFormat[TextureFormat["ETC2_RGBA5"] = 13] = "ETC2_RGBA5";
    /** RGB compressed format,8 bits per pixel. */
    TextureFormat[TextureFormat["ETC2_RGBA8"] = 14] = "ETC2_RGBA8";
    /** RGB compressed format,2 bits per pixel. */
    TextureFormat[TextureFormat["PVRTC_RGB2"] = 15] = "PVRTC_RGB2";
    /** RGBA compressed format,2 bits per pixel. */
    TextureFormat[TextureFormat["PVRTC_RGBA2"] = 16] = "PVRTC_RGBA2";
    /** RGB compressed format,4 bits per pixel. */
    TextureFormat[TextureFormat["PVRTC_RGB4"] = 17] = "PVRTC_RGB4";
    /** RGBA compressed format,4 bits per pixel. */
    TextureFormat[TextureFormat["PVRTC_RGBA4"] = 18] = "PVRTC_RGBA4";
    /** RGB(A) compressed format,128 bits per 4x4 pixel block. */
    TextureFormat[TextureFormat["ASTC_4x4"] = 19] = "ASTC_4x4";
    /** RGB(A) compressed format,128 bits per 5x5 pixel block. */
    TextureFormat[TextureFormat["ASTC_5x5"] = 20] = "ASTC_5x5";
    /** RGB(A) compressed format,128 bits per 6x6 pixel block. */
    TextureFormat[TextureFormat["ASTC_6x6"] = 21] = "ASTC_6x6";
    /** RGB(A) compressed format,128 bits per 8x8 pixel block. */
    TextureFormat[TextureFormat["ASTC_8x8"] = 22] = "ASTC_8x8";
    /** RGB(A) compressed format,128 bits per 10x10 pixel block. */
    TextureFormat[TextureFormat["ASTC_10x10"] = 23] = "ASTC_10x10";
    /** RGB(A) compressed format,128 bits per 12x12 pixel block. */
    TextureFormat[TextureFormat["ASTC_12x12"] = 24] = "ASTC_12x12";
    /** Render to depth buffer,engine will automatically select the supported precision. */
    TextureFormat[TextureFormat["Depth"] = 25] = "Depth";
    /** Render to depth stencil buffer, engine will automatically select the supported precision. */
    TextureFormat[TextureFormat["DepthStencil"] = 26] = "DepthStencil";
    /** Render to stencil buffer. */
    TextureFormat[TextureFormat["Stencil"] = 27] = "Stencil";
    /** Force 16-bit depth buffer. */
    TextureFormat[TextureFormat["Depth16"] = 28] = "Depth16";
    /** Force 24-bit depth buffer. */
    TextureFormat[TextureFormat["Depth24"] = 29] = "Depth24";
    /** Force 32-bit depth buffer. */
    TextureFormat[TextureFormat["Depth32"] = 30] = "Depth32";
    /** Force 16-bit depth + 8-bit stencil buffer. */
    TextureFormat[TextureFormat["Depth24Stencil8"] = 31] = "Depth24Stencil8";
    /** Force 32-bit depth + 8-bit stencil buffer. */
    TextureFormat[TextureFormat["Depth32Stencil8"] = 32] = "Depth32Stencil8";
})(TextureFormat || (TextureFormat = {}));

/**
 * The base class of texture, contains some common functions of texture-related classes.
 */
class Texture {
    name;
    /** Whether to enable mipmap. */
    _mipmap;
    /** Texture object storage address. */
    _glTexture;
    /** Texture sampler. */
    _glTarget;
    /** Texture format detail. */
    _formatDetail;
    /** Texture format. */
    _format;
    /** Texture width. */
    _width;
    /** Texture height. */
    _height;
    _mipmapCount;
    _gl;
    _wrapModeU;
    _wrapModeV;
    _filterMode;
    get format() {
        return this._format;
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get wrapModeU() {
        return this._wrapModeU;
    }
    set wrapModeU(value) {
        if (value === this._wrapModeU)
            return;
        this._wrapModeU = value;
    }
    get wrapModeV() {
        return this._wrapModeV;
    }
    set wrapModeV(value) {
        if (value === this._wrapModeV)
            return;
        this._wrapModeV = value;
    }
    get mipmapCount() {
        return this._mipmapCount;
    }
    get filterMode() {
        return this._filterMode;
    }
    set filterMode(value) {
        if (value === this._filterMode)
            return;
        this._filterMode = value;
    }
    _getMaxMiplevel(size) {
        return Math.floor(Math.log2(size));
    }
    _getMipmapCount() {
        return this._mipmap ? Math.floor(Math.log2(Math.max(this._width, this._height))) + 1 : 1;
    }
    /**
     * Get detailed texture detail information based on texture format.
     * @param format Texture format.
     * @param gl WebGLRenderingContext.
     * @returns Texture format detail.
     */
    static _getFormatDetail(format, gl) {
        switch (format) {
            case TextureFormat.R8G8B8:
                return {
                    internalFormat: gl.RGB,
                    baseFormat: gl.RGB,
                    dataType: gl.UNSIGNED_BYTE,
                    isCompressed: false,
                };
            case TextureFormat.R8G8B8A8:
                return {
                    internalFormat: gl.RGBA,
                    baseFormat: gl.RGBA,
                    dataType: gl.UNSIGNED_BYTE,
                    isCompressed: false,
                };
            case TextureFormat.R4G4B4A4:
                return {
                    internalFormat: gl.RGBA,
                    baseFormat: gl.RGBA,
                    dataType: gl.UNSIGNED_SHORT_4_4_4_4,
                    isCompressed: false,
                };
            case TextureFormat.R5G5B5A1:
                return {
                    internalFormat: gl.RGBA,
                    baseFormat: gl.RGBA,
                    dataType: gl.UNSIGNED_SHORT_5_5_5_1,
                    isCompressed: false,
                };
            case TextureFormat.R5G6B5:
                return {
                    internalFormat: gl.RGB,
                    baseFormat: gl.RGB,
                    dataType: gl.UNSIGNED_SHORT_5_6_5,
                    isCompressed: false,
                };
            case TextureFormat.Alpha8:
                return {
                    internalFormat: gl.ALPHA,
                    baseFormat: gl.ALPHA,
                    dataType: gl.UNSIGNED_BYTE,
                    isCompressed: false,
                };
            case TextureFormat.LuminanceAlpha:
                return {
                    internalFormat: gl.LUMINANCE_ALPHA,
                    baseFormat: gl.LUMINANCE_ALPHA,
                    dataType: gl.UNSIGNED_BYTE,
                    isCompressed: false,
                };
            default:
                throw new Error(`this TextureFormat is not supported in Oasis Engine: ${format}`);
        }
    }
}

/**
 * The filter mode of the texture.
 */
var TextureFilterMode;
(function (TextureFilterMode) {
    /** Point filtering. */
    TextureFilterMode[TextureFilterMode["Point"] = 0] = "Point";
    /** Bilinear filtering. */
    TextureFilterMode[TextureFilterMode["Bilinear"] = 1] = "Bilinear";
    /** Trilinear filtering. */
    TextureFilterMode[TextureFilterMode["Trilinear"] = 2] = "Trilinear";
})(TextureFilterMode || (TextureFilterMode = {}));

/**
 * Wrapping mode of the texture.
 */
var TextureWrapMode;
(function (TextureWrapMode) {
    /** Clamping mode. use the color of edge pixels beyond the texture boundary. */
    TextureWrapMode[TextureWrapMode["Clamp"] = 0] = "Clamp";
    /** Repeating mode. tiling will be repeated if it exceeds the texture boundary. */
    TextureWrapMode[TextureWrapMode["Repeat"] = 1] = "Repeat";
    /** Mirror repeat mode. tiling will be mirrored and repeated if it exceeds the texture boundary. */
    TextureWrapMode[TextureWrapMode["Mirror"] = 2] = "Mirror";
})(TextureWrapMode || (TextureWrapMode = {}));

/**
 * Two-dimensional texture.
 */
class Texture2D extends Texture {
    /**
     * Create Texture2D.
     * @param engine Define the engine to use to render this texture.
     * @param width Texture width.
     * @param height Texture height.
     * @param format Texture format. default  `TextureFormat.R8G8B8A8`.
     * @param mipmap Whether to use multi-level texture.
     */
    constructor(engine, width, height, format = TextureFormat.R8G8B8A8, mipmap = true) {
        super();
        this._mipmap = mipmap;
        this._width = width;
        this._height = height;
        this._format = format;
        this._mipmapCount = this._getMipmapCount();
        this.filterMode = TextureFilterMode.Bilinear;
        this.wrapModeU = this.wrapModeV = TextureWrapMode.Repeat;
        this._gl = engine.gl;
        this._glTexture = this._gl.createTexture();
        this._glTarget = this._gl.TEXTURE_2D;
        this._formatDetail = Texture._getFormatDetail(format, this._gl);
    }
    /**
     * Set texture based on pixel buffer.
     * @param colorBuffer Color buffer array.
     * @param mipLevel Mip level.
     * @param x Starting point x position.
     * @param y Starting point y position.
     * @param width Set width.
     * @param height Set height.
     */
    setPixelBuffer(colorBuffer, mipLevel = 0, x = 0, y = 0, width, height) {
        const gl = this._gl;
        const { internalFormat, baseFormat, dataType } = this._formatDetail;
        const mipWidth = Math.max(1, this._width >> mipLevel);
        const mipHeight = Math.max(1, this.height >> mipLevel);
        width = width || mipWidth - x;
        height = height || mipHeight - y;
        // webgl2 才可以考虑纹理压缩API isCompressed
        gl.bindTexture(this._glTarget, this._glTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.texParameteri(this._glTarget, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        // gl.texSubImage2D(this._glTarget, mipLevel, x, y, width, height, baseFormat, dataType, colorBuffer);
        gl.texImage2D(this._glTarget, mipLevel, internalFormat, width, height, 0, baseFormat, dataType, colorBuffer);
    }
    /**
     * Set the texture according to the picture.
     * @param imageSource Image source.
     * @param mipLevel Mip level.
     * @param flipY Y axis reversed.
     */
    setImageSource(imageSource, mipLevel, flipY) {
        const gl = this._gl;
        const { baseFormat, dataType, internalFormat } = this._formatDetail;
        gl.bindTexture(this._glTarget, this._glTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, +flipY);
        // 将Alpha通道乘以其他颜色通道
        // gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, +premultiplyAlpha);
        // gl.texSubImage2D(this._glTarget, mipLevel, x || 0, y || 0, baseFormat, dataType, imageSource);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(this._glTarget, mipLevel, internalFormat, baseFormat, dataType, imageSource);
    }
}

/**
 * Define the face of the cube texture.
 */
var TextureCubeFace;
(function (TextureCubeFace) {
    /** Positive X face for a cube-mapped texture. */
    TextureCubeFace[TextureCubeFace["PositiveX"] = 0] = "PositiveX";
    /** Negative X face for a cube-mapped texture. */
    TextureCubeFace[TextureCubeFace["NegativeX"] = 1] = "NegativeX";
    /** Positive Y face for a cube-mapped texture. */
    TextureCubeFace[TextureCubeFace["PositiveY"] = 2] = "PositiveY";
    /** Negative Y face for a cube-mapped texture. */
    TextureCubeFace[TextureCubeFace["NegativeY"] = 3] = "NegativeY";
    /** Positive Z face for a cube-mapped texture. */
    TextureCubeFace[TextureCubeFace["PositiveZ"] = 4] = "PositiveZ";
    /** Negative Z face for a cube-mapped texture. */
    TextureCubeFace[TextureCubeFace["NegativeZ"] = 5] = "NegativeZ";
})(TextureCubeFace || (TextureCubeFace = {}));

/**
 * Image materials using 2D textures to display the earth, raster tiles, etc.
 */
class ImageMaterial extends Material {
    /** The texture used by the image material. */
    texture2d;
    /** The address of the texture sampler in the shader. */
    static _sampleprop = Shader.getPropertyByName('u_Sampler');
    // TODO: 应该建立一个shader池，这样就不用再传入shader了
    constructor(engine, shader, url) {
        super(engine, shader);
        const shaderData = this.shaderData;
        this.loadTexture(url)
            .then((image) => {
            this.texture2d = new Texture2D(engine, image.width, image.height, TextureFormat.R8G8B8, false);
            this.texture2d.setImageSource(image, 0, false);
            shaderData.setTexture(ImageMaterial._sampleprop, this.texture2d);
        })
            .catch((error) => {
            throw error;
        });
    }
    /**
     * Load texture image according to url.
     * @param url Texture image url.
     * @returns Promise<HTMLImageElement>
     */
    loadTexture(url) {
        return new Promise((resolve, reject) => {
            let image = new Image();
            image.onload = () => {
                resolve(image);
            };
            image.onerror = (error) => {
                reject(error);
            };
            image.src = url;
            image.crossOrigin = 'anonymous';
        });
    }
}

/**
 * Cube texture.
 */
class TextureCube extends Texture {
    /**
     * Create TextureCube.
     * @param engine Define the engine to use to render this texture.
     * @param size Texture size. texture width must be equal to height in cube texture.
     * @param format Texture format,default TextureFormat.R8G8B8A8.
     * @param mipmap Whether to use multi-level texture.
     */
    constructor(engine, size, format = TextureFormat.R8G8B8A8, mipmap = true) {
        super();
        this._mipmap = mipmap;
        this._width = size;
        this._height = size;
        this._format = format;
        this._mipmapCount = this._getMipmapCount();
        this.filterMode = TextureFilterMode.Bilinear;
        this.wrapModeU = this.wrapModeV = TextureWrapMode.Clamp;
        this._gl = engine.gl;
        this._glTexture = this._gl.createTexture();
        this._glTarget = this._gl.TEXTURE_CUBE_MAP;
        this._formatDetail = Texture._getFormatDetail(format, this._gl);
    }
    /**
     * Set texture based on pixel buffer.
     * @param face Which side of the cube.
     * @param colorBuffer Color buffer.
     * @param mipLevel Mip level.
     */
    setPixelBuffer(face, colorBuffer, mipLevel = 0) {
        const gl = this._gl;
        const { internalFormat, baseFormat, dataType } = this._formatDetail;
        gl.bindTexture(this._glTarget, this._glTexture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, 0);
        gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + face, mipLevel, internalFormat, this._width, this._height, 0, baseFormat, dataType, colorBuffer);
    }
    /**
     * Set the texture according to the picture.
     * @param face Which side of the cube.
     * @param imageSource Image source.
     * @param mipLevel Mip level.
     */
    setImageSource(face, imageSource, mipLevel) {
        const gl = this._gl;
        const { baseFormat, dataType, internalFormat } = this._formatDetail;
        gl.bindTexture(this._glTarget, this._glTexture);
        gl.texImage2D(face, mipLevel, internalFormat, baseFormat, dataType, imageSource);
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    }
}

/**
 * A skybox material built with a cube texture, used to display the starry sky, etc.
 */
class SkyBoxMaterial extends Material {
    /** Cube texture. */
    textureCube;
    /** Six sided information array. */
    faceInfoArr;
    /** Get the sampler for the cube texture in the shader. */
    static _skyboxprop = Shader.getPropertyByName('u_Skybox');
    // TODO: 抽RefObject
    constructor(engine, faceInfoArr) {
        super(engine, Shader.find('skybox'));
        const shaderData = this.shaderData;
        this.textureCube = new TextureCube(engine, 1024);
        this.faceInfoArr = faceInfoArr;
        const gl = engine.gl;
        this.faceInfoArr.forEach((faceInfo) => {
            const { target, url } = faceInfo;
            const level = 0;
            const image = new Image();
            image.src = url;
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                this.textureCube.setImageSource(target, image, level);
                gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
            };
        });
        shaderData.setTexture(SkyBoxMaterial._skyboxprop, this.textureCube);
    }
}

/**
 * Buffer binding flag.
 */
var BufferBindFlag;
(function (BufferBindFlag) {
    /** Vertex buffer binding flag */
    BufferBindFlag[BufferBindFlag["VertexBuffer"] = 0] = "VertexBuffer";
    /** Index buffer binding flag */
    BufferBindFlag[BufferBindFlag["IndexBuffer"] = 1] = "IndexBuffer";
})(BufferBindFlag || (BufferBindFlag = {}));

/**
 * Buffer usage.
 */
var BufferUsage;
(function (BufferUsage) {
    /** The buffer content are intended to be specified once, and used many times */
    BufferUsage[BufferUsage["Static"] = 0] = "Static";
    /** The buffer contents are intended to be respecified repeatedly, and used many times */
    BufferUsage[BufferUsage["Dynamic"] = 1] = "Dynamic";
    /** The buffer contents are intended to be specified once, and used at most a few times */
    BufferUsage[BufferUsage["Stream"] = 2] = "Stream";
})(BufferUsage || (BufferUsage = {}));

/**
 * Vertex element format.
 */
var VertexElementFormat;
(function (VertexElementFormat) {
    /** 32-bit float */
    VertexElementFormat[VertexElementFormat["Float"] = 0] = "Float";
    /** Two-dimensional 32-bit float */
    VertexElementFormat[VertexElementFormat["Vector2"] = 1] = "Vector2";
    /** Three-dimensional 32-bit float */
    VertexElementFormat[VertexElementFormat["Vector3"] = 2] = "Vector3";
    /** Four-dimensional 32-bit float */
    VertexElementFormat[VertexElementFormat["Vector4"] = 3] = "Vector4";
    /** Four-dimensional 8-bit integer,range is [-128,127] */
    VertexElementFormat[VertexElementFormat["Byte4"] = 4] = "Byte4";
    /** Four-dimensional 8-bit Unsigned integer, range is [0,255] */
    VertexElementFormat[VertexElementFormat["UByte4"] = 5] = "UByte4";
    /** Four-dimensional 8-bit Normalized integer, range is [-1,1] */
    VertexElementFormat[VertexElementFormat["NormalizedByte4"] = 6] = "NormalizedByte4";
    /** Four-dimensional 8-bit Normalized unsigned integer, range is [0,1] */
    VertexElementFormat[VertexElementFormat["NormalizedUByte4"] = 7] = "NormalizedUByte4";
    /** Two-dimensional 16-bit integer, range is[-32768, 32767] */
    VertexElementFormat[VertexElementFormat["Short2"] = 8] = "Short2";
    /** Two-dimensional 16-bit Unsigned integer, range is [0, 65535] */
    VertexElementFormat[VertexElementFormat["UShort2"] = 9] = "UShort2";
    /** Two-dimensional 16-bit Unsigned integer, range is [-1, 1] */
    VertexElementFormat[VertexElementFormat["NormalizedShort2"] = 10] = "NormalizedShort2";
    /** Two-dimensional 16-bit Normalized unsigned integer, range is [0, 1] */
    VertexElementFormat[VertexElementFormat["NormalizedUShort2"] = 11] = "NormalizedUShort2";
    /** Four-dimensional 16-bit integer, range is [-32768, 32767] */
    VertexElementFormat[VertexElementFormat["Short4"] = 12] = "Short4";
    /** Four-dimensional 16-bit Unsigned integer, range is [0, 65535] */
    VertexElementFormat[VertexElementFormat["UShort4"] = 13] = "UShort4";
    /** Four-dimensional 16-bit Normalized integer, range is[-1, 1] */
    VertexElementFormat[VertexElementFormat["NormalizedShort4"] = 14] = "NormalizedShort4";
    /** Four-dimensional 16-bit Normalized unsigned integer, range is [0, 1] */
    VertexElementFormat[VertexElementFormat["NormalizedUShort4"] = 15] = "NormalizedUShort4";
})(VertexElementFormat || (VertexElementFormat = {}));

/**
 * Data type enumeration
 */
var DataType;
(function (DataType) {
    /** Float */
    DataType[DataType["FLOAT"] = 5126] = "FLOAT";
    /** Floating-point two-dimensional vector */
    DataType[DataType["FLOAT_VEC2"] = 35664] = "FLOAT_VEC2";
    /** Floating-point three-dimensional vector */
    DataType[DataType["FLOAT_VEC3"] = 35665] = "FLOAT_VEC3";
    /** Floating-point four-dimensional vector */
    DataType[DataType["FLOAT_VEC4"] = 35666] = "FLOAT_VEC4";
    /** Integer */
    DataType[DataType["INT"] = 5124] = "INT";
    /** Integer two-dimensional vector */
    DataType[DataType["INT_VEC2"] = 35667] = "INT_VEC2";
    /** Integer three-dimensional vector */
    DataType[DataType["INT_VEC3"] = 35668] = "INT_VEC3";
    /** Integer four-dimensional vector */
    DataType[DataType["INT_VEC4"] = 35669] = "INT_VEC4";
    /** Boolean */
    DataType[DataType["BOOL"] = 35670] = "BOOL";
    /** Boolean two-dimensional vector */
    DataType[DataType["BOOL_VEC2"] = 35671] = "BOOL_VEC2";
    /** Boolean three-dimensional vector */
    DataType[DataType["BOOL_VEC3"] = 35672] = "BOOL_VEC3";
    /** Boolean four-dimensional vector */
    DataType[DataType["BOOL_VEC4"] = 35673] = "BOOL_VEC4";
    /** Second-order matrix */
    DataType[DataType["FLOAT_MAT2"] = 35674] = "FLOAT_MAT2";
    /** Third-order matrix */
    DataType[DataType["FLOAT_MAT3"] = 35675] = "FLOAT_MAT3";
    /** Fourth-order matrix */
    DataType[DataType["FLOAT_MAT4"] = 35676] = "FLOAT_MAT4";
    /** Float array */
    DataType[DataType["FLOAT_ARRAY"] = 35677] = "FLOAT_ARRAY";
    /** Floating-point two-dimensional vector array */
    DataType[DataType["FLOAT_VEC2_ARRAY"] = 100000] = "FLOAT_VEC2_ARRAY";
    /** Floating-point three-dimensional vector array */
    DataType[DataType["FLOAT_VEC3_ARRAY"] = 100001] = "FLOAT_VEC3_ARRAY";
    /** Floating-point four-dimensional vector array */
    DataType[DataType["FLOAT_VEC4_ARRAY"] = 100002] = "FLOAT_VEC4_ARRAY";
    /** Integer array */
    DataType[DataType["INT_ARRAY"] = 100003] = "INT_ARRAY";
    /** Integer two-dimensional vector array */
    DataType[DataType["INT_VEC2_ARRAY"] = 100004] = "INT_VEC2_ARRAY";
    /** Integer three-dimensional vector array */
    DataType[DataType["INT_VEC3_ARRAY"] = 100005] = "INT_VEC3_ARRAY";
    /** Integer four-dimensional vector array */
    DataType[DataType["INT_VEC4_ARRAY"] = 100006] = "INT_VEC4_ARRAY";
    /** Second-order matrix array */
    DataType[DataType["FLOAT_MAT2_ARRAY"] = 100007] = "FLOAT_MAT2_ARRAY";
    /** Third-order matrix array */
    DataType[DataType["FLOAT_MAT3_ARRAY"] = 100008] = "FLOAT_MAT3_ARRAY";
    /** Fourth-order matrix array */
    DataType[DataType["FLOAT_MAT4_ARRAY"] = 100009] = "FLOAT_MAT4_ARRAY";
    /** 2D texture sampler array */
    DataType[DataType["SAMPLER_2D_ARRAY"] = 100010] = "SAMPLER_2D_ARRAY";
    /** Cube map texture sampler array */
    DataType[DataType["SAMPLER_CUBE_ARRAY"] = 100011] = "SAMPLER_CUBE_ARRAY";
    /** 2D sampler */
    DataType[DataType["SAMPLER_2D"] = 35678] = "SAMPLER_2D";
    /** Cube map Texture sampler */
    DataType[DataType["SAMPLER_CUBE"] = 35680] = "SAMPLER_CUBE";
    /** Byte */
    DataType[DataType["BYTE"] = 5120] = "BYTE";
    /** Unsigned byte */
    DataType[DataType["UNSIGNED_BYTE"] = 5121] = "UNSIGNED_BYTE";
    /** Short */
    DataType[DataType["SHORT"] = 5122] = "SHORT";
    /** Unsigned short */
    DataType[DataType["UNSIGNED_SHORT"] = 5123] = "UNSIGNED_SHORT";
    /** Unsigned int */
    DataType[DataType["UNSIGNED_INT"] = 5125] = "UNSIGNED_INT";
    DataType[DataType["TEXTURE_CUBE_MAP_POSITIVE_X"] = 34069] = "TEXTURE_CUBE_MAP_POSITIVE_X";
    DataType[DataType["TEXTURE_CUBE_MAP_NEGATIVE_X"] = 34070] = "TEXTURE_CUBE_MAP_NEGATIVE_X";
    DataType[DataType["TEXTURE_CUBE_MAP_POSITIVE_Y"] = 34071] = "TEXTURE_CUBE_MAP_POSITIVE_Y";
    DataType[DataType["TEXTURE_CUBE_MAP_NEGATIVE_Y"] = 34072] = "TEXTURE_CUBE_MAP_NEGATIVE_Y";
    DataType[DataType["TEXTURE_CUBE_MAP_POSITIVE_Z"] = 34073] = "TEXTURE_CUBE_MAP_POSITIVE_Z";
    DataType[DataType["TEXTURE_CUBE_MAP_NEGATIVE_Z"] = 34074] = "TEXTURE_CUBE_MAP_NEGATIVE_Z";
})(DataType || (DataType = {}));
/**
 * GL Capabilities
 * Some capabilities can be smoothed out by extension, and some capabilities must use WebGL 2.0.
 * */
var GLCapabilityType;
(function (GLCapabilityType) {
    GLCapabilityType["shaderVertexID"] = "shaderVertexID";
    GLCapabilityType["standardDerivatives"] = "OES_standard_derivatives";
    GLCapabilityType["shaderTextureLod"] = "EXT_shader_texture_lod";
    GLCapabilityType["elementIndexUint"] = "OES_element_index_uint";
    GLCapabilityType["depthTexture"] = "WEBGL_depth_texture";
    GLCapabilityType["drawBuffers"] = "WEBGL_draw_buffers";
    GLCapabilityType["vertexArrayObject"] = "OES_vertex_array_object";
    GLCapabilityType["instancedArrays"] = "ANGLE_instanced_arrays";
    GLCapabilityType["multipleSample"] = "multipleSampleOnlySupportedInWebGL2";
    GLCapabilityType["textureFloat"] = "OES_texture_float";
    GLCapabilityType["textureFloatLinear"] = "OES_texture_float_linear";
    GLCapabilityType["textureHalfFloat"] = "OES_texture_half_float";
    GLCapabilityType["textureHalfFloatLinear"] = "OES_texture_half_float_linear";
    GLCapabilityType["WEBGL_colorBufferFloat"] = "WEBGL_color_buffer_float";
    GLCapabilityType["colorBufferFloat"] = "EXT_color_buffer_float";
    GLCapabilityType["colorBufferHalfFloat"] = "EXT_color_buffer_half_float";
    GLCapabilityType["textureFilterAnisotropic"] = "EXT_texture_filter_anisotropic";
    GLCapabilityType["blendMinMax"] = "EXT_blend_minmax";
    GLCapabilityType["astc"] = "WEBGL_compressed_texture_astc";
    GLCapabilityType["astc_webkit"] = "WEBKIT_WEBGL_compressed_texture_astc";
    GLCapabilityType["etc"] = "WEBGL_compressed_texture_etc";
    GLCapabilityType["etc_webkit"] = "WEBKIT_WEBGL_compressed_texture_etc";
    GLCapabilityType["etc1"] = "WEBGL_compressed_texture_etc1";
    GLCapabilityType["etc1_webkit"] = "WEBKIT_WEBGL_compressed_texture_etc1";
    GLCapabilityType["pvrtc"] = "WEBGL_compressed_texture_pvrtc";
    GLCapabilityType["pvrtc_webkit"] = "WEBKIT_WEBGL_compressed_texture_pvrtc";
    GLCapabilityType["s3tc"] = "WEBGL_compressed_texture_s3tc";
    GLCapabilityType["s3tc_webkit"] = "WEBKIT_WEBGL_compressed_texture_s3tc";
    // atc = "WEBGL_compressed_texture_atc",
    // s3tc_srgb = "WEBGL_compressed_texture_s3tc_srgb"
})(GLCapabilityType || (GLCapabilityType = {}));

/**
 * Index format.
 */
var IndexFormat;
(function (IndexFormat) {
    /** 8 bit */
    IndexFormat[IndexFormat["UInt8"] = 0] = "UInt8";
    /** 16 bit */
    IndexFormat[IndexFormat["UInt16"] = 1] = "UInt16";
    /** 32 bit */
    IndexFormat[IndexFormat["UInt32"] = 2] = "UInt32";
})(IndexFormat || (IndexFormat = {}));

/**
 * Utility functions for processing Buffers.
 */
class BufferUtil {
    /**
     * Obtain the usage of Buffer according to the incoming enumeration.
     * @param gl WebGL rendering context.
     * @param bufferUsage Buffer usage.
     * @returns The number code used by the internal buffer of gl.
     */
    static _getGLBufferUsage(gl, bufferUsage) {
        switch (bufferUsage) {
            case BufferUsage.Static:
                return gl.STATIC_DRAW;
            case BufferUsage.Dynamic:
                return gl.DYNAMIC_DRAW;
            case BufferUsage.Stream:
                return gl.STREAM_DRAW;
        }
    }
    /**
     * Get index type code.
     * @param indexFormat Index type enumeration.
     * @returns The number code used by the internal type of gl.
     */
    static _getGLIndexType(indexFormat) {
        switch (indexFormat) {
            case IndexFormat.UInt8:
                return DataType.UNSIGNED_BYTE;
            case IndexFormat.UInt16:
                return DataType.UNSIGNED_SHORT;
            case IndexFormat.UInt32:
                return DataType.UNSIGNED_INT;
        }
    }
    /**
     * Get gl index byte count.
     * @param indexFormat Index type enumeration.
     * @returns Index byte count.
     */
    static _getGLIndexByteCount(indexFormat) {
        switch (indexFormat) {
            case IndexFormat.UInt8:
                return 1;
            case IndexFormat.UInt16:
                return 2;
            case IndexFormat.UInt32:
                return 4;
        }
    }
    /**
     * Returns vertex information based on the element's vertex format.
     */
    static _getElementInfo(format) {
        let size;
        let type;
        let normalized = false;
        switch (format) {
            case VertexElementFormat.Float:
                size = 1;
                type = DataType.FLOAT;
                break;
            case VertexElementFormat.Vector2:
                size = 2;
                type = DataType.FLOAT;
                break;
            case VertexElementFormat.Vector3:
                size = 3;
                type = DataType.FLOAT;
                break;
            case VertexElementFormat.Vector4:
                size = 4;
                type = DataType.FLOAT;
                break;
            case VertexElementFormat.Byte4:
                size = 4;
                type = DataType.BYTE;
                break;
            case VertexElementFormat.UByte4:
                size = 4;
                type = DataType.UNSIGNED_BYTE;
                break;
            case VertexElementFormat.NormalizedByte4:
                size = 4;
                type = DataType.BYTE;
                normalized = true;
                break;
            case VertexElementFormat.NormalizedUByte4:
                size = 4;
                type = DataType.UNSIGNED_BYTE;
                normalized = true;
                break;
            case VertexElementFormat.Short2:
                size = 2;
                type = DataType.SHORT;
                break;
            case VertexElementFormat.UShort2:
                size = 2;
                type = DataType.UNSIGNED_SHORT;
                break;
            case VertexElementFormat.NormalizedShort2:
                size = 2;
                type = DataType.SHORT;
                normalized = true;
                break;
            case VertexElementFormat.NormalizedUShort2:
                size = 2;
                type = DataType.UNSIGNED_SHORT;
                normalized = true;
                break;
            case VertexElementFormat.Short4:
                size = 4;
                type = DataType.SHORT;
                break;
            case VertexElementFormat.UShort4:
                size = 4;
                type = DataType.UNSIGNED_SHORT;
                break;
            case VertexElementFormat.NormalizedShort4:
                size = 4;
                type = DataType.SHORT;
                normalized = true;
                break;
            case VertexElementFormat.NormalizedUShort4:
                size = 4;
                type = DataType.UNSIGNED_SHORT;
                normalized = true;
                break;
        }
        return { size, type, normalized };
    }
}

/**
 * Buffer base class,
 * which can be an array of vertex buffers or an array of index buffers.
 */
class Buffer {
    // TODO: 把gl挂载到RefObject
    _gl;
    _glBindTarget;
    _glBufferUsage;
    _nativeBuffer;
    _type;
    _byteLength;
    _bufferUsage;
    /**
     * Buffer binding flag.
     */
    get type() {
        return this._type;
    }
    /**
     * Byte length.
     */
    get byteLength() {
        return this._byteLength;
    }
    /**
     * Buffer usage.
     */
    get bufferUsage() {
        return this._bufferUsage;
    }
    constructor(gl, type, byteLengthOrData, bufferUsage = BufferUsage.Static) {
        this._gl = gl;
        this._type = type;
        this._bufferUsage = bufferUsage;
        const glBufferUsage = BufferUtil._getGLBufferUsage(gl, bufferUsage);
        const glBindTarget = type === BufferBindFlag.VertexBuffer ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER;
        this._nativeBuffer = gl.createBuffer();
        this._glBufferUsage = glBufferUsage;
        this._glBindTarget = glBindTarget;
        this.bind();
        if (typeof byteLengthOrData === 'number') {
            this._byteLength = byteLengthOrData;
            gl.bufferData(glBindTarget, byteLengthOrData, glBufferUsage);
        }
        else {
            this._byteLength = byteLengthOrData.byteLength;
            gl.bufferData(glBindTarget, byteLengthOrData, glBufferUsage);
        }
        gl.bindBuffer(glBindTarget, null);
    }
    /**
     * Bind buffer.
     */
    bind() {
        const gl = this._gl;
        gl.bindBuffer(this._glBindTarget, this._nativeBuffer);
    }
    setData(data, bufferByteOffset = 0, dataOffset = 0, dataLength) {
        const gl = this._gl;
        const glBindTarget = this._glBindTarget;
        this.bind();
        // 每个元素所占用的字节数
        const byteSize = data.BYTES_PER_ELEMENT || 1;
        const dataByteLength = dataLength ? byteSize * dataLength : data.byteLength;
        if (dataOffset !== 0 || dataByteLength < data.byteLength) {
            const isArrayBufferView = data.byteOffset !== undefined;
            const subData = new Uint8Array(isArrayBufferView ? data.buffer : data, dataOffset * byteSize, dataByteLength);
            gl.bufferSubData(glBindTarget, bufferByteOffset, subData);
        }
        else {
            gl.bufferSubData(glBindTarget, bufferByteOffset, data);
        }
        gl.bindBuffer(glBindTarget, null);
    }
    getData(data, bufferByteOffset = 0, dataOffset = 0, dataLength) {
        throw 'Buffer is write-only on WebGL1.0 platforms.';
    }
}

/**
 * Mesh topology.
 */
var MeshTopology;
(function (MeshTopology) {
    /** Draws a single dot */
    MeshTopology[MeshTopology["Points"] = 0] = "Points";
    /** Draws a line between a pair of vertices */
    MeshTopology[MeshTopology["Lines"] = 1] = "Lines";
    /** Draws a straight line to the next vertex, and connects the last vertex back to the first */
    MeshTopology[MeshTopology["LineLoop"] = 2] = "LineLoop";
    /** Draws a straight line to the next vertex. */
    MeshTopology[MeshTopology["LineStrip"] = 3] = "LineStrip";
    /** Draws a triangle for a group of three vertices */
    MeshTopology[MeshTopology["Triangles"] = 4] = "Triangles";
    /** Draws a triangle strip */
    MeshTopology[MeshTopology["TriangleStrip"] = 5] = "TriangleStrip";
    /** Draws a triangle fan */
    MeshTopology[MeshTopology["TriangleFan"] = 6] = "TriangleFan";
})(MeshTopology || (MeshTopology = {}));

/**
 * Index buffer binding.
 */
class IndexBufferBinding {
    /** Index buffer bound buffer. */
    _buffer;
    /** Index format. */
    _format;
    /**
     * Index buffer.
     */
    get buffer() {
        return this._buffer;
    }
    /**
     * Index buffer format.
     */
    get format() {
        return this._format;
    }
    /**
     * Create index buffer binding.
     * @param buffer - Index buffer
     * @param format - Index buffer format
     */
    constructor(buffer, format) {
        this._buffer = buffer;
        this._format = format;
    }
}

/**
 * Sub-mesh, mainly contains drawing information.
 */
class SubMesh {
    /** Start drawing offset. */
    start;
    /** Drawing count. */
    count;
    /** Drawing topology. */
    topology;
    /**
     * Create a sub-mesh.
     * @param start - Start drawing offset
     * @param count - Drawing count
     * @param topology - Drawing topology
     */
    constructor(start = 0, count = 0, topology = MeshTopology.Triangles) {
        this.start = start;
        this.count = count;
        this.topology = topology;
    }
}

/**
 * Grid abstract class.
 */
class Mesh {
    /** Name. */
    name;
    /** Vertex entity record table, used for caching. */
    _vertexElementMap = {};
    /** The storage type of the index, for example: UInt8. */
    _glIndexType;
    /** Each index occupies several bytes, 8 bits per byte. */
    _glIndexByteCount;
    /** A platform that provides rendering capabilities. */
    _platformPrimitive;
    /** A Mesh may consist of multiple vertex instances. */
    _instanceCount = 0;
    /** The vertex buffer corresponding to the mesh. */
    _vertexBufferBindings = [];
    /** The index buffer corresponding to the mesh */
    _indexBufferBinding = null;
    /** Array of vertex elements. */
    _vertexElements = [];
    gl;
    /** Drawing information for each element. */
    _subMeshes = [];
    /**
     * First sub-mesh. Rendered using the first material.
     */
    get subMesh() {
        return this._subMeshes[0] || null;
    }
    /**
     * A collection of sub-mesh, each sub-mesh can be rendered with an independent material.
     */
    get subMeshes() {
        return this._subMeshes;
    }
    addSubMesh(startOrSubMesh, count, topology = MeshTopology.Triangles) {
        if (typeof startOrSubMesh === 'number') {
            startOrSubMesh = new SubMesh(startOrSubMesh, count, topology);
        }
        this._subMeshes.push(startOrSubMesh);
        return startOrSubMesh;
    }
    /**
     * Remove sub-mesh.
     * @param subMesh - Sub-mesh needs to be removed
     */
    removeSubMesh(subMesh) {
        const subMeshes = this._subMeshes;
        const index = subMeshes.indexOf(subMesh);
        if (index !== -1) {
            subMeshes.splice(index, 1);
        }
    }
    /**
     * Clear all sub-mesh.
     */
    clearSubMesh() {
        this._subMeshes.length = 0;
    }
    constructor(gl, name) {
        this.gl = gl;
        this.name = name;
        this._platformPrimitive = new Renderer(gl, this);
    }
    _clearVertexElements() {
        // 这个清空方法妙啊
        this._vertexElements.length = 0;
        const vertexElementMap = this._vertexElementMap;
        for (const k in vertexElementMap) {
            delete vertexElementMap[k];
        }
    }
    _addVertexElement(element) {
        const { semantic } = element;
        this._vertexElementMap[semantic] = element;
        this._vertexElements.push(element);
    }
    _draw(shaderProgram, subMesh) {
        this._platformPrimitive.draw(shaderProgram, subMesh);
    }
    _onDestroy() {
        this._vertexBufferBindings = null;
        this._indexBufferBinding = null;
        this._vertexElements = null;
        this._vertexElementMap = null;
    }
    _setVertexElements(elements) {
        this._clearVertexElements();
        for (let i = 0, n = elements.length; i < n; i++) {
            this._addVertexElement(elements[i]);
        }
    }
    _setVertexBufferBinding(index, binding) {
        this._vertexBufferBindings[index] = binding;
    }
    _setIndexBufferBinding(binding) {
        if (binding) {
            this._indexBufferBinding = binding;
            this._glIndexType = BufferUtil._getGLIndexType(binding.format);
            this._glIndexByteCount = BufferUtil._getGLIndexByteCount(binding.format);
        }
        else {
            this._indexBufferBinding = null;
            this._glIndexType = undefined;
        }
    }
}

/**
 * Vertex buffer binding.
 */
class VertexBufferBinding {
    /** Buffer to which vertex elements are bound. */
    _buffer;
    /** Span between each vertex. */
    _stride;
    /**
     * Vertex buffer.
     */
    get buffer() {
        return this._buffer;
    }
    /**
     * Vertex buffer stride.
     */
    get stride() {
        return this._stride;
    }
    /**
     * Create vertex buffer.
     * @param buffer - Vertex buffer
     * @param stride - Vertex buffer stride
     */
    constructor(buffer, stride) {
        this._buffer = buffer;
        this._stride = stride;
    }
}

/**
 * Vertex elements contain coordinate information, texture information, normal vector information.
 */
class VertexElement {
    _glElementInfo;
    _semantic;
    _offset;
    _format;
    _bindingIndex;
    _instanceStepRate;
    /**
     * Vertex semantic.
     */
    get semantic() {
        return this._semantic;
    }
    /**
     * Vertex data byte offset.
     */
    get offset() {
        return this._offset;
    }
    /**
     * Vertex data format.
     */
    get format() {
        return this._format;
    }
    /**
     * Vertex buffer binding index.
     */
    get bindingIndex() {
        return this._bindingIndex;
    }
    /**
     * Instance cadence, the number of instances drawn for each vertex in the buffer, non-instance elements must be 0.
     */
    get instanceStepRate() {
        return this._instanceStepRate;
    }
    /**
     * Create vertex element.
     * @param semantic - Input vertex semantic
     * @param offset - Vertex data byte offset
     * @param format - Vertex data format
     * @param bindingIndex - Vertex buffer binding index
     * @param instanceStepRate - Instance cadence, the number of instances drawn for each vertex in the buffer, non-instance elements must be 0.
     */
    constructor(semantic, offset, format, bindingIndex, instanceStepRate = 0) {
        this._semantic = semantic;
        this._offset = offset;
        this._format = format;
        this._bindingIndex = bindingIndex;
        this._glElementInfo = BufferUtil._getElementInfo(this.format);
        this._instanceStepRate = Math.floor(instanceStepRate);
    }
}

/**
 * Create a model from an array of information such as vertices, indices, normal vectors, etc.
 */
class ModelMesh extends Mesh {
    /** The number of vertices in the model. */
    _vertexCount = 0;
    /** Availability of the model. */
    _accessible = true;
    _verticesFloat32 = null;
    _verticesUint8 = null;
    /** A vertex has several elements, xyz is 3. */
    _elementCount = 0;
    _lastUploadVertexCount = -1;
    /** Index format. */
    _indicesFormat = null;
    /** Index type array. */
    _indices = null;
    /** Array of vertex positions. */
    _positions = [];
    /** Array of normal vectors. */
    _normals = null;
    /** Array of texture coordinates */
    _uv = null;
    /**
     * Whether to access data of the mesh.
     */
    get accessible() {
        return this._accessible;
    }
    /**
     * Vertex count of current mesh.
     */
    get vertexCount() {
        return this._vertexCount;
    }
    // TODO: 这个也应该抽到RefObject.
    constructor(gl, name) {
        super(gl);
        this.name = name;
    }
    /**
     * Set the vertex position information of the model.
     * @param positions Array of model vertex coordinates.
     */
    setPositions(positions) {
        if (!this._accessible) {
            throw 'Not allowed to access data while accessible is false.';
        }
        this._positions = positions;
        this._vertexCount = positions.length;
    }
    /**
     * Get the vertex position information of the model.
     * @returns Array of model vertex coordinates.
     */
    getPostions() {
        return this._positions;
    }
    /**
     * Set model normal vector.
     * @param normals Array of normal vectors.
     */
    setNormals(normals) {
        if (!this._accessible) {
            throw 'Not allowed to access data while accessible is false.';
        }
        if (normals.length !== this._vertexCount) {
            throw 'The array provided needs to be the same size as vertex count.';
        }
        this._normals = normals;
    }
    /**
     * Get model normal vector.
     * @returns Array of normal vectors.
     */
    getNormals() {
        return this._normals;
    }
    /**
     * Set texture coordinates.
     * @param uv Texture coordinates.
     */
    setUVs(uv) {
        this._uv = uv;
    }
    /**
     * Get texture coordinates.
     * @returns Texture coordinates.
     */
    getUVs() {
        return this._uv;
    }
    /**
     * Set indices for the mesh.
     * @param indices - The indices for the mesh.
     */
    setIndices(indices) {
        if (!this._accessible) {
            throw 'Not allowed to access data while accessible is false.';
        }
        if (this._indices !== indices) {
            this._indices = indices;
            if (indices instanceof Uint8Array) {
                this._indicesFormat = IndexFormat.UInt8;
            }
            else if (indices instanceof Uint16Array) {
                this._indicesFormat = IndexFormat.UInt16;
            }
            else if (indices instanceof Uint32Array) {
                this._indicesFormat = IndexFormat.UInt32;
            }
        }
    }
    /**
     * Get indices for the mesh.
     */
    getIndices() {
        if (!this._accessible) {
            throw 'Not allowed to access data while accessible is false.';
        }
        return this._indices;
    }
    /**
     * Upload Mesh Data to the graphics API.
     */
    uploadData(noLongerAccessible = true) {
        if (!this._accessible) {
            throw 'Not allowed to access data while accessible is false.';
        }
        this._updateVertexElements();
        const gl = this.gl;
        // positions的Vector3的个数
        const { _vertexCount: vertexCount } = this;
        const vertexCountChange = this._lastUploadVertexCount !== vertexCount;
        const vertexBuffer = this._vertexBufferBindings[0]?._buffer;
        if (vertexCountChange) {
            // 一组数据有多少个元素，比如：顶点(3) + 法向量(3) + 纹理(2) = 8
            const elementCount = this._elementCount;
            // Float32Array数组该给多少空间
            const vertexFloatCount = elementCount * vertexCount;
            const vertices = new Float32Array(vertexFloatCount);
            this._verticesFloat32 = vertices;
            // 这个东西有什么用实在搞不明白？
            this._verticesUint8 = new Uint8Array(vertices.buffer);
            this._updateVertices(vertices);
            const newVertexBuffer = new Buffer(gl, BufferBindFlag.VertexBuffer, vertices, noLongerAccessible ? BufferUsage.Static : BufferUsage.Dynamic);
            // 因为是Float32Array，32位，4个字节，故stride为elementCount * 4
            this._setVertexBufferBinding(0, new VertexBufferBinding(newVertexBuffer, elementCount * 4));
            this._lastUploadVertexCount = vertexCount;
        }
        else {
            const vertices = this._verticesFloat32;
            this._updateVertices(vertices);
            vertexBuffer.setData(vertices);
        }
        const { _indices } = this;
        const indexBuffer = this._indexBufferBinding?._buffer;
        if (_indices) {
            if (!indexBuffer || _indices.byteLength != indexBuffer.byteLength) {
                const newIndexBuffer = new Buffer(gl, BufferBindFlag.IndexBuffer, _indices);
                this._setIndexBufferBinding(new IndexBufferBinding(newIndexBuffer, this._indicesFormat));
            }
        }
        else if (indexBuffer) {
            this._setIndexBufferBinding(null);
        }
    }
    /**
     * Vertex elements are composed of vertex coordinates, texture coordinates, normal vectors and other information.
     */
    _updateVertexElements() {
        this._clearVertexElements();
        // 因为顶点元素是必须有的！
        this._addVertexElement(POSITION_VERTEX_ELEMENT);
        // 3 * 4 = 12
        let offset = 12;
        let elementCount = 3;
        if (this._normals) {
            this._addVertexElement(new VertexElement('NORMAL', offset, VertexElementFormat.Vector3, 0));
            offset += 12;
            elementCount += 3;
        }
        if (this._uv) {
            this._addVertexElement(new VertexElement('TEXCOORD_0', offset, VertexElementFormat.Vector2, 0));
            offset += 8;
            elementCount += 2;
        }
        // ! 索引信息没处理
        this._elementCount = elementCount;
    }
    /**
     * Fill the void Float32Array with postion, normal and uvs.
     * @param vertices void Float32Array
     */
    _updateVertices(vertices) {
        const { _elementCount, _vertexCount, _positions, _normals, _uv } = this;
        for (let i = 0; i < _vertexCount; i++) {
            const start = _elementCount * i;
            const position = _positions[i];
            vertices[start] = position.x;
            vertices[start + 1] = position.y;
            vertices[start + 2] = position.z;
        }
        let offset = 3;
        if (_normals) {
            for (let i = 0; i < _vertexCount; i++) {
                const start = _elementCount * i + offset;
                const normal = _normals[i];
                if (normal) {
                    vertices[start] = normal.x;
                    vertices[start + 1] = normal.y;
                    vertices[start + 2] = normal.z;
                }
            }
            offset += 3;
        }
        if (_uv) {
            for (let i = 0; i < _vertexCount; i++) {
                const start = _elementCount * i + offset;
                const uv = _uv[i];
                if (uv) {
                    vertices[start] = uv.x;
                    vertices[start + 1] = uv.y;
                }
            }
            offset += 2;
        }
    }
}
const POSITION_VERTEX_ELEMENT = new VertexElement('POSITION', 0, VertexElementFormat.Vector3, 0);

/**
 * Create a Mesh of Simple Geometry.
 */
class PrimitiveMesh {
    /**
     * Create a cuboid mesh.
     * @param width - Cuboid width
     * @param height - Cuboid height
     * @param depth - Cuboid depth
     * @returns Cuboid model mesh
     */
    static createCuboid(engine, width = 1, height = 1, depth = 1) {
        const gl = engine.gl;
        const mesh = new ModelMesh(gl, 'Cuboid');
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const halfDepth = depth / 2;
        const positions = new Array(24);
        const normals = new Array(24);
        const uvs = new Array(24);
        // Up
        positions[0] = new Vector3(-halfWidth, halfHeight, -halfDepth);
        positions[1] = new Vector3(halfWidth, halfHeight, -halfDepth);
        positions[2] = new Vector3(halfWidth, halfHeight, halfDepth);
        positions[3] = new Vector3(-halfWidth, halfHeight, halfDepth);
        normals[0] = new Vector3(0, 1, 0);
        normals[1] = new Vector3(0, 1, 0);
        normals[2] = new Vector3(0, 1, 0);
        normals[3] = new Vector3(0, 1, 0);
        uvs[0] = new Vector2(0, 0);
        uvs[1] = new Vector2(1, 0);
        uvs[2] = new Vector2(1, 1);
        uvs[3] = new Vector2(0, 1);
        // Down
        positions[4] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
        positions[5] = new Vector3(halfWidth, -halfHeight, -halfDepth);
        positions[6] = new Vector3(halfWidth, -halfHeight, halfDepth);
        positions[7] = new Vector3(-halfWidth, -halfHeight, halfDepth);
        normals[4] = new Vector3(0, -1, 0);
        normals[5] = new Vector3(0, -1, 0);
        normals[6] = new Vector3(0, -1, 0);
        normals[7] = new Vector3(0, -1, 0);
        uvs[4] = new Vector2(0, 1);
        uvs[5] = new Vector2(1, 1);
        uvs[6] = new Vector2(1, 0);
        uvs[7] = new Vector2(0, 0);
        // Left
        positions[8] = new Vector3(-halfWidth, halfHeight, -halfDepth);
        positions[9] = new Vector3(-halfWidth, halfHeight, halfDepth);
        positions[10] = new Vector3(-halfWidth, -halfHeight, halfDepth);
        positions[11] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
        normals[8] = new Vector3(-1, 0, 0);
        normals[9] = new Vector3(-1, 0, 0);
        normals[10] = new Vector3(-1, 0, 0);
        normals[11] = new Vector3(-1, 0, 0);
        uvs[8] = new Vector2(0, 0);
        uvs[9] = new Vector2(1, 0);
        uvs[10] = new Vector2(1, 1);
        uvs[11] = new Vector2(0, 1);
        // Right
        positions[12] = new Vector3(halfWidth, halfHeight, -halfDepth);
        positions[13] = new Vector3(halfWidth, halfHeight, halfDepth);
        positions[14] = new Vector3(halfWidth, -halfHeight, halfDepth);
        positions[15] = new Vector3(halfWidth, -halfHeight, -halfDepth);
        normals[12] = new Vector3(1, 0, 0);
        normals[13] = new Vector3(1, 0, 0);
        normals[14] = new Vector3(1, 0, 0);
        normals[15] = new Vector3(1, 0, 0);
        uvs[12] = new Vector2(1, 0);
        uvs[13] = new Vector2(0, 0);
        uvs[14] = new Vector2(0, 1);
        uvs[15] = new Vector2(1, 1);
        // Front
        positions[16] = new Vector3(-halfWidth, halfHeight, halfDepth);
        positions[17] = new Vector3(halfWidth, halfHeight, halfDepth);
        positions[18] = new Vector3(halfWidth, -halfHeight, halfDepth);
        positions[19] = new Vector3(-halfWidth, -halfHeight, halfDepth);
        normals[16] = new Vector3(0, 0, 1);
        normals[17] = new Vector3(0, 0, 1);
        normals[18] = new Vector3(0, 0, 1);
        normals[19] = new Vector3(0, 0, 1);
        uvs[16] = new Vector2(0, 0);
        uvs[17] = new Vector2(1, 0);
        uvs[18] = new Vector2(1, 1);
        uvs[19] = new Vector2(0, 1);
        // Back
        positions[20] = new Vector3(-halfWidth, halfHeight, -halfDepth);
        positions[21] = new Vector3(halfWidth, halfHeight, -halfDepth);
        positions[22] = new Vector3(halfWidth, -halfHeight, -halfDepth);
        positions[23] = new Vector3(-halfWidth, -halfHeight, -halfDepth);
        normals[20] = new Vector3(0, 0, -1);
        normals[21] = new Vector3(0, 0, -1);
        normals[22] = new Vector3(0, 0, -1);
        normals[23] = new Vector3(0, 0, -1);
        uvs[20] = new Vector2(1, 0);
        uvs[21] = new Vector2(0, 0);
        uvs[22] = new Vector2(0, 1);
        uvs[23] = new Vector2(1, 1);
        const indices = new Uint16Array(36);
        // prettier-ignore
        // Up
        indices[0] = 0, indices[1] = 2, indices[2] = 1, indices[3] = 2, indices[4] = 0, indices[5] = 3,
            // Down
            indices[6] = 4, indices[7] = 6, indices[8] = 7, indices[9] = 6, indices[10] = 4, indices[11] = 5,
            // Left
            indices[12] = 8, indices[13] = 10, indices[14] = 9, indices[15] = 10, indices[16] = 8, indices[17] = 11,
            // Right
            indices[18] = 12, indices[19] = 14, indices[20] = 15, indices[21] = 14, indices[22] = 12, indices[23] = 13,
            // Front
            indices[24] = 16, indices[25] = 18, indices[26] = 17, indices[27] = 18, indices[28] = 16, indices[29] = 19,
            // Back
            indices[30] = 20, indices[31] = 22, indices[32] = 23, indices[33] = 22, indices[34] = 20, indices[35] = 21;
        PrimitiveMesh._initialize(mesh, positions, normals, uvs, indices);
        return mesh;
    }
    /**
     *
     * @param engine 引擎实例
     * @param level 正四面体递归切分等级
     * @returns 球网格实例
     */
    static createSphereBySliceTetrahedron(engine, level = 0) {
        const gl = engine.gl;
        const mesh = new ModelMesh(gl, 'Sphere');
        const negativeRootTwoOverThree = -Math.sqrt(2.0) / 3.0;
        const negativeOneThird = -1.0 / 3.0;
        const rootSixOverThree = Math.sqrt(6.0) / 3.0;
        const positions = [];
        positions.push(new Vector3(0, 0, 1));
        positions.push(new Vector3(0, (2 * Math.sqrt(2)) / 3, negativeOneThird));
        positions.push(new Vector3(-rootSixOverThree, negativeRootTwoOverThree, negativeOneThird));
        positions.push(new Vector3(rootSixOverThree, negativeRootTwoOverThree, negativeOneThird));
        let indices = [];
        PrimitiveMesh.subdivide(positions, indices, [0, 1, 2], level);
        PrimitiveMesh.subdivide(positions, indices, [0, 2, 3], level);
        PrimitiveMesh.subdivide(positions, indices, [0, 3, 1], level);
        PrimitiveMesh.subdivide(positions, indices, [1, 3, 2], level);
        indices = new Uint16Array(indices);
        PrimitiveMesh._initialize(mesh, positions, null, null, indices);
        return mesh;
    }
    /**
     * Create a sphere mesh.
     * @param engine - Engine
     * @param radius - Sphere radius
     * @param segments - Number of segments
     * @returns Sphere model mesh
     */
    static createSphereByParamEquation(engine, radius = 0.5, segments = 18) {
        const mesh = new ModelMesh(engine.gl);
        segments = Math.max(2, Math.floor(segments));
        const count = segments + 1;
        const vertexCount = count * count;
        const rectangleCount = segments * segments;
        const indices = new Uint16Array(rectangleCount * 6);
        const thetaRange = Math.PI;
        const alphaRange = thetaRange * 2;
        const countReciprocal = 1.0 / count;
        const segmentsReciprocal = 1.0 / segments;
        const positions = new Array(vertexCount);
        const normals = new Array(vertexCount);
        const uvs = new Array(vertexCount);
        for (let i = 0; i < vertexCount; ++i) {
            const x = i % count;
            const y = (i * countReciprocal) | 0;
            const u = x * segmentsReciprocal;
            const v = y * segmentsReciprocal;
            const alphaDelta = u * alphaRange;
            const thetaDelta = v * thetaRange;
            const sinTheta = Math.sin(thetaDelta);
            let posX = -radius * Math.cos(alphaDelta) * sinTheta;
            let posY = radius * Math.cos(thetaDelta);
            let posZ = radius * Math.sin(alphaDelta) * sinTheta;
            // Position
            positions[i] = new Vector3(posX, posY, posZ);
            // Normal
            normals[i] = new Vector3(posX, posY, posZ);
            // Texcoord
            uvs[i] = new Vector2(u, v);
        }
        let offset = 0;
        for (let i = 0; i < rectangleCount; ++i) {
            const x = i % segments;
            const y = (i * segmentsReciprocal) | 0;
            const a = y * count + x;
            const b = a + 1;
            const c = a + count;
            const d = c + 1;
            indices[offset++] = b;
            indices[offset++] = a;
            indices[offset++] = d;
            indices[offset++] = a;
            indices[offset++] = c;
            indices[offset++] = d;
        }
        PrimitiveMesh._initialize(mesh, positions, normals, uvs, indices);
        return mesh;
    }
    /**
     *
     * @param engine - Engine
     * @param width - Plane width
     * @param height - Plane height
     * @param horizontalSegments - Plane horizontal segments
     * @param verticalSegments - Plane vertical segments
     * @param noLongerAccessible - Accessible
     * @returns Plane mesh
     */
    static createPlane(engine, width = 1, height = 1, horizontalSegments = 1, verticalSegments = 1, noLongerAccessible = true) {
        // TODO: 直接传入引擎，不提去gl了
        const mesh = new ModelMesh(engine.gl);
        horizontalSegments = Math.max(1, Math.floor(horizontalSegments));
        verticalSegments = Math.max(1, Math.floor(verticalSegments));
        const horizontalCount = horizontalSegments + 1;
        const verticalCount = verticalSegments + 1;
        const halfWidth = width / 2;
        const halfHeight = height / 2;
        const gridWidth = width / horizontalSegments;
        const gridHeight = height / verticalSegments;
        const vertexCount = horizontalCount * verticalCount;
        const rectangleCount = verticalSegments * horizontalSegments;
        const indices = PrimitiveMesh._generateIndices(engine, vertexCount, rectangleCount * 6);
        const horizontalCountReciprocal = 1.0 / horizontalCount;
        const horizontalSegmentsReciprocal = 1.0 / horizontalSegments;
        const verticalSegmentsReciprocal = 1.0 / verticalSegments;
        const positions = new Array(vertexCount);
        const normals = new Array(vertexCount);
        const uvs = new Array(vertexCount);
        for (let i = 0; i < vertexCount; ++i) {
            const x = i % horizontalCount;
            const z = (i * horizontalCountReciprocal) | 0;
            // Position
            positions[i] = new Vector3(x * gridWidth - halfWidth, 0, z * gridHeight - halfHeight);
            // Normal
            normals[i] = new Vector3(0, 1, 0);
            // Texcoord
            uvs[i] = new Vector2(x * horizontalSegmentsReciprocal, z * verticalSegmentsReciprocal);
        }
        let offset = 0;
        for (let i = 0; i < rectangleCount; ++i) {
            const x = i % horizontalSegments;
            const y = (i * horizontalSegmentsReciprocal) | 0;
            const a = y * horizontalCount + x;
            const b = a + 1;
            const c = a + horizontalCount;
            const d = c + 1;
            indices[offset++] = a;
            indices[offset++] = c;
            indices[offset++] = b;
            indices[offset++] = c;
            indices[offset++] = d;
            indices[offset++] = b;
        }
        // TODO: 加上是否可获取参数！
        PrimitiveMesh._initialize(mesh, positions, normals, uvs, indices);
        return mesh;
    }
    static subdivide(positions, indices, triangle, level = 0) {
        if (level > 0) {
            let tmp1 = new Vector3();
            let tmp2 = new Vector3();
            let tmp3 = new Vector3();
            Vector3.add(positions[triangle[0]], positions[triangle[1]], tmp1);
            Vector3.scale(tmp1, 0.5, tmp1);
            Vector3.add(positions[triangle[1]], positions[triangle[2]], tmp2);
            Vector3.scale(tmp2, 0.5, tmp2);
            Vector3.add(positions[triangle[2]], positions[triangle[0]], tmp3);
            Vector3.scale(tmp3, 0.5, tmp3);
            positions.push(tmp1.normalize(), tmp2.normalize(), tmp3.normalize());
            let i01 = positions.length - 3;
            let i12 = positions.length - 2;
            let i20 = positions.length - 1;
            const newLevel = level - 1;
            PrimitiveMesh.subdivide(positions, indices, [triangle[0], i01, i20], newLevel);
            PrimitiveMesh.subdivide(positions, indices, [i01, triangle[1], i12], newLevel);
            PrimitiveMesh.subdivide(positions, indices, [i01, i12, i20], newLevel);
            PrimitiveMesh.subdivide(positions, indices, [i20, i12, triangle[2]], newLevel);
        }
        else {
            indices.push(...triangle);
        }
    }
    /**
     * According a series of data ti initialize mesh
     * @param mesh object's mesh
     * @param positions object's position array
     * @param normals object's normals array
     * @param uv object's uv array
     * @param indices object's indices array
     */
    static _initialize(mesh, positions, normals, uvs, indices) {
        mesh.setPositions(positions);
        mesh.setIndices(indices);
        // 因为不一定要显示指定法向量和纹理坐标
        if (normals)
            mesh.setNormals(normals);
        if (uvs)
            mesh.setUVs(uvs);
        mesh.uploadData();
        mesh.addSubMesh(0, indices.length);
    }
    // TODO: 对顶点数量有要求，而且还没有兼容WebGL2!
    static _generateIndices(engine, vertexCount, indexCount) {
        let indices = null;
        if (vertexCount > 65535) {
            throw Error('The vertex count is over limit.');
        }
        else {
            indices = new Uint16Array(indexCount);
        }
        return indices;
    }
}

const earthUrl = `http://121.199.160.202/images/earth.jpg`;

const skyStarConfig = [
    {
        target: DataType.TEXTURE_CUBE_MAP_POSITIVE_X,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_mx.jpg',
    },
    {
        target: DataType.TEXTURE_CUBE_MAP_NEGATIVE_X,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_px.jpg',
    },
    {
        target: DataType.TEXTURE_CUBE_MAP_POSITIVE_Y,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_py.jpg',
    },
    {
        target: DataType.TEXTURE_CUBE_MAP_NEGATIVE_Y,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_my.jpg',
    },
    {
        target: DataType.TEXTURE_CUBE_MAP_POSITIVE_Z,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_mz.jpg',
    },
    {
        target: DataType.TEXTURE_CUBE_MAP_NEGATIVE_Z,
        url: 'http://121.199.160.202/images/skybox/tycho2t3_80_pz.jpg',
    },
];

/**
 * Background of the scene.
 */
class Background {
    _engine;
    /**
     * The pattern of the background, which may be a single color, a skybox or a picture texture.
     */
    mode = BackgroundMode.SolidColor;
    /** Grid for background. */
    _mesh;
    /** The material used for the background. */
    _material;
    /** Fixed color before skybox or texture is loaded successfully. */
    solidColor = new Color(0.25, 0.25, 0.25, 1.0);
    constructor(_engine) {
        this._engine = _engine;
        this._mesh = this._createPlane(this._engine);
        this._material = new SkyBoxMaterial(this._engine, skyStarConfig);
    }
    /**
     * Background with flat grid.
     * @param engine Engine instance.
     * @returns Mesh
     */
    _createPlane(engine) {
        const mesh = new ModelMesh(engine.gl);
        // const indices = new Uint8Array([0, 3, 1, 1, 3, 2]);
        const positions = [
            new Vector3(-1, -1, 0),
            new Vector3(1, -1, 0),
            new Vector3(-1, 1, 0),
            new Vector3(-1, 1, 0),
            new Vector3(1, -1, 0),
            new Vector3(1, 1, 0),
        ];
        mesh.setPositions(positions);
        // mesh.setIndices(indices);
        mesh.uploadData(false);
        mesh.addSubMesh(0, 6);
        return mesh;
    }
}

/** Prevent gimbal lock. */
const ESP = MathUtil.zeroTolerance;
/**
 * Spherical.
 */
class Spherical {
    /** Spherical radius. */
    radius;
    /** In the xoy plane, the angle with the x-axis. */
    phi;
    /** Angle with z-axis. */
    theta;
    /**
     * Build the initial state of the sphere.
     * @param radius Spherical radius, default is 1.0.
     * @param phi Angle with the x-axis, default is 0.
     * @param theta Angle with the z-axis, default is 0.
     */
    constructor(radius, phi, theta) {
        this.radius = radius !== undefined ? radius : 1.0;
        this.phi = phi !== undefined ? phi : 0;
        this.theta = theta !== undefined ? theta : 0;
    }
    /**
     * Set spherical state
     * @param radius Spherical radius.
     * @param phi Angle with the x-axis.
     * @param theta Angle with the z-axis.
     * @returns Spherical.
     */
    set(radius, phi, theta) {
        this.radius = radius;
        this.phi = phi;
        this.theta = theta;
        return this;
    }
    makeSafe() {
        this.phi = MathUtil.clamp(this.phi, ESP, Math.PI - ESP);
        return this;
    }
    /**
     * Calculate sphere state from vector.
     * @param v3 Vector3.
     * @returns Spherical.
     */
    setFromVec3(v3) {
        this.radius = v3.length();
        if (this.radius === 0) {
            this.theta = 0;
            this.phi = 0;
        }
        else {
            this.theta = Math.atan2(v3.x, v3.z);
            this.phi = Math.acos(MathUtil.clamp(v3.y / this.radius, -1, 1));
        }
        return this;
    }
    /**
     * Get Vector3 from sphere state.
     * @param v3 Vector3.
     * @returns Spherical.
     */
    setToVec3(v3) {
        const sinPhiRadius = Math.sin(this.phi) * this.radius;
        v3.setValue(sinPhiRadius * Math.sin(this.theta), Math.cos(this.phi) * this.radius, sinPhiRadius * Math.cos(this.theta));
        return this;
    }
}

/**
 * Orbital controls for zooming around a center point.
 */
class OrbitControl {
    /** Camera instance, the essence of orbit control is to change the camera position. */
    camera;
    /** DOM element, mainly used to listen for mouse up events. */
    domElement;
    /** Canvas element, mainly used to monitor mouse movement events. */
    mainElement;
    /** Camera frustum angle. */
    fov;
    /** Where the camera is looking. */
    target;
    /** Camera up. */
    up;
    /** The minimum distance from the camera to the object. */
    minDistance;
    /** The maximum distance from the camera to the object. */
    maxDistance;
    /** The smallest zoom scale of the camera. */
    minZoom;
    /** The maximum zoom scale of the camera. */
    maxZoom;
    /** Scaling factor. */
    zoomFactor;
    /** Min polar angle. */
    minPolarAngle;
    /** Max polar angle. */
    maxPolarAngle;
    /** Min azimuth angle. */
    minAzimuthAngle;
    /** Max azimuth angle. */
    maxAzimuthAngle;
    /** Whether to enable damping. */
    enableDamping;
    /** Whether to enable rotate. */
    enableRotate;
    /** Whether to enable zoom. */
    enableZoom;
    /** Whether to enable pan. */
    enablePan;
    /** Damping factor */
    dampingFactor;
    /** Zoom speed */
    zoomSpeed;
    /** Whether to auto rotate. */
    autoRotate;
    /** Auto rotate speed. */
    autoRotateSpeed = Math.PI;
    /** Rotate speed. */
    rotateSpeed;
    /** Clicking the corresponding key with the mouse is actually the key corresponding to the left button, the scroll wheel and the right button. */
    mouseButtons;
    /** What state is the current controller in. */
    STATE;
    /** Contains mousemove and mouseup. */
    mouseUpEvents;
    /** Contains mousedown and wheel. */
    constEvents;
    _position;
    _offset;
    _spherical;
    _sphericalDelta;
    _sphericalDump;
    _zoomFrag;
    _scale;
    _panOffset;
    _isMouseUp;
    _vPan;
    _state;
    _rotateStart;
    _rotateEnd;
    _rotateDelta;
    _panStart;
    _panEnd;
    _panDelta;
    _zoomStart;
    _zoomEnd;
    _zoomDelta;
    constructor(camera) {
        this.camera = camera;
        this.domElement = document;
        this.mainElement = camera.engine.canvas._canvas;
        this.fov = 45;
        this.target = new Vector3();
        this.up = new Vector3(0, 1, 0);
        this.minDistance = 0.1;
        this.maxDistance = Infinity;
        this.minZoom = 0.0;
        this.maxZoom = Infinity;
        this.minPolarAngle = 0;
        this.maxPolarAngle = Math.PI;
        this.minAzimuthAngle = -Infinity;
        this.maxAzimuthAngle = Infinity;
        this.enableDamping = true;
        this.dampingFactor = 0.1;
        this.zoomFactor = 0.2;
        this.enableZoom = true;
        this.zoomSpeed = 1.0;
        this.enableRotate = true;
        this.rotateSpeed = 1.0;
        this.enablePan = true;
        this.autoRotate = false;
        this.mouseButtons = {
            ORBIT: 0,
            ZOOM: 1,
            PAN: 2,
        };
        // Reuse objects to prevent excessive stack allocation.
        // update
        this._position = new Vector3();
        this._offset = new Vector3();
        this._spherical = new Spherical();
        this._sphericalDelta = new Spherical();
        this._sphericalDump = new Spherical();
        this._zoomFrag = 0;
        this._scale = 1;
        this._panOffset = new Vector3();
        this._isMouseUp = true;
        // pan
        this._vPan = new Vector3();
        // state
        this._rotateStart = new Vector2();
        this._rotateEnd = new Vector2();
        this._rotateDelta = new Vector2();
        this._panStart = new Vector2();
        this._panEnd = new Vector2();
        this._panDelta = new Vector2();
        this._zoomStart = new Vector2();
        this._zoomEnd = new Vector2();
        this._zoomDelta = new Vector2();
        this.STATE = {
            NONE: -1,
            ROTATE: 0,
            ZOOM: 1,
            PAN: 2,
        };
        this._state = this.STATE.NONE;
        this.constEvents = [
            { type: 'mousedown', listener: this.onMouseDown.bind(this) },
            { type: 'wheel', listener: this.onMouseWheel.bind(this) },
        ];
        this.mouseUpEvents = [
            { type: 'mousemove', listener: this.onMouseMove.bind(this) },
            { type: 'mouseup', listener: this.onMouseUp.bind(this) },
        ];
        // onMouseDown里面处理了mousemove和mouseup的事件
        this.constEvents.forEach((ele) => {
            if (ele.element) {
                ele.element.addEventListener(ele.type, ele.listener, false);
            }
            else {
                this.mainElement.addEventListener(ele.type, ele.listener, false);
            }
        });
    }
    /**
     * The life cycle of track control destruction, used to remove listener events.
     */
    onDestory() {
        this.constEvents.forEach((ele) => {
            if (ele.element) {
                ele.element.removeEventListener(ele.type, ele.listener, false);
            }
            else {
                this.mainElement.removeEventListener(ele.type, ele.listener, false);
            }
        });
        const element = this.domElement === document ? this.domElement.body : this.domElement;
        this.mainElement.removeEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
        element.removeEventListener(this.mouseUpEvents[1].type, this.mouseUpEvents[1].listener, false);
    }
    /**
     * The orbit controls the life cycle, updating the view based on the current mouse changes.
     * @param dtime Used to calculate how many degrees to rotate.
     */
    onUpdate(dtime) {
        const position = this.camera.transform.position;
        position.cloneTo(this._offset);
        this._offset.subtract(this.target);
        this._spherical.setFromVec3(this._offset);
        if (this.autoRotate && this._state === this.STATE.NONE) {
            this.rotateLeft(this.getAutoRotationAngle(dtime));
        }
        this._spherical.theta += this._sphericalDelta.theta;
        this._spherical.phi += this._sphericalDelta.phi;
        this._spherical.theta = Math.max(this.minAzimuthAngle, Math.min(this.maxAzimuthAngle, this._spherical.theta));
        this._spherical.phi = Math.max(this.minPolarAngle, Math.min(this.maxPolarAngle, this._spherical.phi));
        this._spherical.makeSafe();
        if (this._scale !== 1) {
            this._zoomFrag = this._spherical.radius * (this._scale - 1);
        }
        this._spherical.radius += this._zoomFrag;
        this._spherical.radius = Math.max(this.minDistance, Math.min(this.maxDistance, this._spherical.radius));
        this.target.add(this._panOffset);
        this._spherical.setToVec3(this._offset);
        this.target.cloneTo(this._position);
        this._position.add(this._offset);
        this.camera.transform.position = this._position;
        this.camera.transform.lookAt(this.target, this.up);
        if (this.enableDamping === true) {
            this._sphericalDump.theta *= 1 - this.dampingFactor;
            this._sphericalDump.phi *= 1 - this.dampingFactor;
            this._zoomFrag *= 1 - this.zoomFactor;
            if (this._isMouseUp) {
                this._sphericalDelta.theta = this._sphericalDump.theta;
                this._sphericalDelta.phi = this._sphericalDump.phi;
            }
            else {
                this._sphericalDelta.set(0, 0, 0);
            }
        }
        else {
            this._sphericalDelta.set(0, 0, 0);
            this._zoomFrag = 0;
        }
        this._scale = 1;
        this._panOffset.setValue(0, 0, 0);
    }
    /**
     * Handle left and right translation.
     * @param distance Camera translation distance.
     * @param worldMatrix Camera's world coordinate matrix.
     */
    panLeft(distance, worldMatrix) {
        const e = worldMatrix.elements;
        this._vPan.setValue(e[0], e[1], e[2]);
        this._vPan.scale(distance);
        this._panOffset.add(this._vPan);
    }
    /**
     * Handle up and down translation.
     * @param distance Camera translation distance.
     * @param worldMatrix Camera's world coordinate matrix.
     */
    panUp(distance, worldMatrix) {
        const e = worldMatrix.elements;
        this._vPan.setValue(e[4], e[5], e[6]);
        this._vPan.scale(distance);
        this._panOffset.add(this._vPan);
    }
    /**
     * Pan according to panLeft and panUp.
     * @param deltaX The difference between the mouse and the x-direction of the previous view.
     * @param deltaY The difference between the mouse and the y-direction of the previous view
     */
    pan(deltaX, deltaY) {
        // perspective only
        const position = this.camera.transform.position;
        position.cloneTo(this._vPan);
        this._vPan.subtract(this.target);
        let targetDistance = this._vPan.length();
        targetDistance *= (this.fov / 2) * (Math.PI / 180);
        // 我们在这里只使用clientHeight，这样纵横比不会扭曲速度
        this.panLeft(-2 * deltaX * (targetDistance / this.mainElement.clientHeight), this.camera.transform.worldMatrix);
        this.panUp(2 * deltaY * (targetDistance / this.mainElement.clientHeight), this.camera.transform.worldMatrix);
    }
    /**
     * Zoom in view.
     * @param zoomScale Zoom scale.
     */
    zoomIn(zoomScale) {
        // perspective only
        this._scale *= zoomScale;
    }
    /**
     * Zoom out view.
     * @param zoomScale Zoom scale.
     */
    zoomOut(zoomScale) {
        // perspective only
        this._scale /= zoomScale;
    }
    /**
     * Get zoom level.
     * @returns Zoom scale.
     */
    getZoomScale() {
        return Math.pow(0.95, this.zoomSpeed);
    }
    /**
     * Rotate left and right.
     * @param radian Rotation angle, radian system.
     */
    rotateLeft(radian) {
        this._sphericalDelta.theta -= radian;
        if (this.enableDamping) {
            this._sphericalDump.theta = -radian;
        }
    }
    /**
     * Rotate up and down.
     * @param radian Rotation angle, radian system.
     */
    rotateUp(radian) {
        this._sphericalDelta.phi -= radian;
        if (this.enableDamping) {
            this._sphericalDump.phi = -radian;
        }
    }
    /**
     * Get auto rotation angle.
     * @param dtime Rendering the time difference between the current frame and the previous frame.
     * @returns Auto rotate speed.
     */
    getAutoRotationAngle(dtime) {
        return (this.autoRotateSpeed / 1000) * dtime;
    }
    /**
     * Set rotate start when state is rotate.
     * @param event Mouse event.
     */
    handleMouseDownRotate(event) {
        this._rotateStart.setValue(event.clientX, event.clientY);
    }
    /**
     * Set zoom start when state is zoom.
     * @param event Mouse event.
     */
    handleMouseDownZoom(event) {
        this._zoomStart.setValue(event.clientX, event.clientY);
    }
    /**
     * Set pan start when state is pan.
     * @param event Mouse event.
     */
    handleMouseDownPan(event) {
        this._panStart.setValue(event.clientX, event.clientY);
    }
    /**
     * Calculate the rotation difference when the mouse is moved.
     * @param event Mouse event.
     */
    handleMouseMoveRotate(event) {
        this._rotateEnd.setValue(event.clientX, event.clientY);
        Vector2.subtract(this._rotateEnd, this._rotateStart, this._rotateDelta);
        // x方向平移的百分比
        this.rotateLeft(2 * Math.PI * (this._rotateDelta.x / this.mainElement.clientWidth) * this.rotateSpeed);
        // y方向平移的百分比
        this.rotateUp(2 * Math.PI * (this._rotateDelta.y / this.mainElement.clientHeight) * this.rotateSpeed);
        // 将end设置为新的start
        this._rotateEnd.cloneTo(this._rotateStart);
    }
    /**
     * Calculate the rotation difference when the mouse is moved.
     * @param event Mouse event.
     */
    handleMouseMoveZoom(event) {
        this._zoomEnd.setValue(event.clientX, event.clientY);
        Vector2.subtract(this._zoomEnd, this._zoomStart, this._zoomDelta);
        if (this._zoomDelta.y > 0) {
            this.zoomOut(this.getZoomScale());
        }
        else if (this._zoomDelta.y < 0) {
            this.zoomIn(this.getZoomScale());
        }
        // 将end复制到新的start
        this._zoomEnd.cloneTo(this._zoomStart);
    }
    /**
     * Calculate the pan difference when the mouse is moved.
     * @param event Mouse event.
     */
    handleMouseMovePan(event) {
        this._panEnd.setValue(event.clientX, event.clientY);
        Vector2.subtract(this._panEnd, this._panStart, this._panDelta);
        this.pan(this._panDelta.x, this._panDelta.y);
        this._panEnd.cloneTo(this._panStart);
    }
    /**
     * Calculate the wheel difference when the mouse is moved.
     * @param event Mouse event.
     */
    handleMouseWheel(event) {
        if (event.deltaY < 0) {
            this.zoomIn(this.getZoomScale());
        }
        else if (event.deltaY > 0) {
            this.zoomOut(this.getZoomScale());
        }
    }
    /**
     * Listen to the mouse click event,
     * and set the context state to the mouse click type according to the click type,
     * and then select the corresponding processing method
     * @param event Mouse event.
     */
    onMouseDown(event) {
        event.preventDefault();
        this._isMouseUp = false;
        switch (event.button) {
            case this.mouseButtons.ORBIT:
                this.handleMouseDownRotate(event);
                this._state = this.STATE.ROTATE;
                break;
            case this.mouseButtons.ZOOM:
                this.handleMouseDownZoom(event);
                this._state = this.STATE.ZOOM;
                break;
            case this.mouseButtons.PAN:
                this.handleMouseDownPan(event);
                this._state = this.STATE.PAN;
                break;
        }
        if (this._state !== this.STATE.NONE) {
            const element = this.domElement === document ? this.domElement.body : this.domElement;
            // canvas元素监听move事件
            // onMouseMove
            this.mainElement.addEventListener(this.mouseUpEvents[0].type, this.mouseUpEvents[0].listener, false);
            // 父级元素监听鼠标up事件
            // onMouseUp
            element.addEventListener(this.mouseUpEvents[1].type, this.mouseUpEvents[1].listener, false);
        }
    }
    /**
     * Monitor mouse movement events,
     * select the corresponding movement processing method for the current context state.
     * @param event Mouse event.
     */
    onMouseMove(event) {
        event.preventDefault();
        switch (this._state) {
            case this.STATE.ROTATE:
                this.handleMouseMoveRotate(event);
                break;
            case this.STATE.ZOOM:
                this.handleMouseMoveZoom(event);
                break;
            case this.STATE.PAN:
                this.handleMouseMovePan(event);
                break;
        }
    }
    /**
     * Listen for the mouse up event,
     * remove the corresponding listener event and set the context state to none.
     */
    onMouseUp() {
        this._isMouseUp = true;
        this.mouseUpEvents.forEach((ele) => {
            const element = this.domElement === document ? this.domElement.body : this.domElement;
            element.removeEventListener(ele.type, ele.listener, false);
            this.mainElement.removeEventListener(ele.type, ele.listener, false);
        });
        this._state = this.STATE.NONE;
    }
    /**
     * Listen to the mouse wheel event,
     * prevent the default behavior,
     * and scale according to the current event event information.
     * @param event Mouse wheel event.
     */
    onMouseWheel(event) {
        event.preventDefault();
        event.stopPropagation();
        this.handleMouseWheel(event);
    }
}

const Util = {
    isArray: 'isArray' in Array
        ? Array.isArray
        : (value) => {
            return toString.call(value) === '[object Array]';
        },
    isArrayLike(x) {
        return !!x && typeof x.length === 'number' && typeof x !== 'function';
    },
    clone(obj) {
        if (typeof obj !== 'object' || obj === null) {
            return obj;
        }
        let rst;
        if (Util.isArrayLike(obj)) {
            rst = obj.slice();
            for (let i = 0, l = obj.length; i < l; i++) {
                rst[i] = Util.clone(obj[i]);
            }
        }
        else {
            rst = {};
            for (const k in obj) {
                if (obj.hasOwnProperty(k)) {
                    rst[k] = Util.clone(obj[k]);
                }
            }
        }
        return rst;
    },
    downloadBlob(blob, fileName = '') {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement('a');
        document.body.appendChild(a);
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        a.addEventListener('click', () => {
            if (a.parentElement) {
                a.parentElement.removeChild(a);
            }
        });
        a.click();
        window.URL.revokeObjectURL(url);
    },
};
const isArrayLike = (x) => x && typeof x.length === 'number' && typeof x !== 'function';
/**
 * Fastly remove an element from array.
 * @param array - Array
 * @param item - Element
 */
function removeFromArray(array, item) {
    const index = array.indexOf(item);
    if (index < 0) {
        return false;
    }
    const last = array.length - 1;
    if (index !== last) {
        const end = array[last];
        array[index] = end;
    }
    array.length--;
    return true;
}
/**
 * Get the value of an object or array.
 * @param obj Object or Array.
 * @returns Object value array.
 */
function ObjectValues(obj) {
    return Object.keys(obj).map((key) => obj[key]);
}

/**
 * Used to update tags.
 */
class UpdateFlag {
    /** @internal */
    _flagManagers = [];
    /**
     * Clear.
     */
    clearFromManagers() {
        this._removeFromManagers();
        this._flagManagers.length = 0;
    }
    /**
     * Destroy.
     */
    destroy() {
        this._removeFromManagers();
        this._flagManagers = null;
    }
    _removeFromManagers() {
        const flagManagers = this._flagManagers;
        for (let i = 0, n = flagManagers.length; i < n; i++) {
            removeFromArray(flagManagers[i]._updateFlags, this);
        }
    }
}

/**
 * Used to update tags.
 */
class BoolUpdateFlag extends UpdateFlag {
    /** Flag. */
    flag = true;
    /**
     * @inheritdoc
     */
    dispatch() {
        this.flag = true;
    }
}

/**
 * @internal
 */
class UpdateFlagManager {
    /** @internal */
    _updateFlags = [];
    /**
     * Create a UpdateFlag.
     * @returns - The UpdateFlag.
     */
    createFlag(type) {
        const flag = new type();
        this.addFlag(flag);
        return flag;
    }
    /**
     * Add a UpdateFlag.
     * @param flag - The UpdateFlag.
     */
    addFlag(flag) {
        this._updateFlags.push(flag);
        flag._flagManagers.push(this);
    }
    /**
     * Dispatch.
     */
    dispatch(param) {
        const updateFlags = this._updateFlags;
        for (let i = updateFlags.length - 1; i >= 0; i--) {
            updateFlags[i].dispatch(param);
        }
    }
}

/**
 * Used to implement transformation related functions.
 */
class Transform {
    static _tempQuat0 = new Quaternion();
    static _tempVec30 = new Vector3();
    static _tempVec31 = new Vector3();
    static _tempVec32 = new Vector3();
    static _tempMat30 = new Matrix3();
    static _tempMat31 = new Matrix3();
    static _tempMat32 = new Matrix3();
    static _tempMat41 = new Matrix4();
    static _tempMat42 = new Matrix4();
    _position = new Vector3();
    _rotation = new Vector3();
    _rotationQuaternion = new Quaternion();
    _scale = new Vector3(1, 1, 1);
    _worldPosition = new Vector3();
    _worldRotation = new Vector3();
    _worldRotationQuaternion = new Quaternion();
    _lossyWorldScale = new Vector3(1, 1, 1);
    _localMatrix = new Matrix4();
    _worldMatrix = new Matrix4();
    _updateFlagManager = new UpdateFlagManager();
    _isParentDirty = true;
    _parentTransformCache = null;
    _entity;
    _dirtyFlag = TransformFlag.WmWpWeWqWs;
    /**
     * Local position.
     */
    get position() {
        return this._position;
    }
    set position(value) {
        if (this._position !== value) {
            value.cloneTo(this._position);
        }
    }
    /**
     * World position.
     */
    get worldPosition() {
        const worldPosition = this._worldPosition;
        if (this._isContainDirtyFlag(TransformFlag.WorldPosition)) {
            //@ts-ignore
            worldPosition._onValueChanged = null;
            // if (this._getParentTransform()) {
            {
                this._position.cloneTo(worldPosition);
            }
            //@ts-ignore
            worldPosition._onValueChanged = this._onWorldPositionChanged;
            this._setDirtyFlagFalse(TransformFlag.WorldPosition);
        }
        return worldPosition;
    }
    set worldPosition(value) {
        if (this._worldPosition !== value) {
            value.cloneTo(this._worldPosition);
        }
    }
    /**
     * Local rotation, defining the rotation value in degrees.
     * Rotations are performed around the Y axis, the X axis, and the Z axis, in that order.
     */
    get rotation() {
        const rotation = this._rotation;
        if (this._isContainDirtyFlag(TransformFlag.LocalEuler)) {
            //@ts-ignore
            rotation._onValueChanged = null;
            this._rotationQuaternion.toEuler(rotation);
            //@ts-ignore
            rotation._onValueChanged = this._onRotationChanged;
            rotation.scale(MathUtil.radToDegreeFactor); // radians to degrees
            this._setDirtyFlagFalse(TransformFlag.LocalEuler);
        }
        return rotation;
    }
    set rotation(value) {
        if (this._rotation !== value) {
            value.cloneTo(this._rotation);
        }
    }
    /**
     * World rotation, defining the rotation value in degrees.
     * Rotations are performed around the Y axis, the X axis, and the Z axis, in that order.
     */
    get worldRotation() {
        const worldRotation = this._worldRotation;
        if (this._isContainDirtyFlag(TransformFlag.WorldEuler)) {
            //@ts-ignore
            worldRotation._onValueChanged = null;
            this.worldRotationQuaternion.toEuler(worldRotation);
            worldRotation.scale(MathUtil.radToDegreeFactor); // Radian to angle
            //@ts-ignore
            worldRotation._onValueChanged = this._onWorldRotationChanged;
            this._setDirtyFlagFalse(TransformFlag.WorldEuler);
        }
        return worldRotation;
    }
    set worldRotation(value) {
        if (this._worldRotation !== value) {
            value.cloneTo(this._worldRotation);
        }
    }
    /**
     * Local rotation, defining the rotation by using a unit quaternion.
     */
    get rotationQuaternion() {
        const rotationQuaternion = this._rotationQuaternion;
        if (this._isContainDirtyFlag(TransformFlag.LocalQuat)) {
            //@ts-ignore
            rotationQuaternion._onValueChanged = null;
            Quaternion.rotationEuler(MathUtil.degreeToRadian(this._rotation.x), MathUtil.degreeToRadian(this._rotation.y), MathUtil.degreeToRadian(this._rotation.z), rotationQuaternion);
            //@ts-ignore
            rotationQuaternion._onValueChanged = this._onRotationQuaternionChanged;
            this._setDirtyFlagFalse(TransformFlag.LocalQuat);
        }
        return rotationQuaternion;
    }
    set rotationQuaternion(value) {
        if (this._rotationQuaternion !== value) {
            if (value.normalized) {
                value.cloneTo(this._rotationQuaternion);
            }
            else {
                Quaternion.normalize(value, this._rotationQuaternion);
            }
        }
        else {
            value.normalized || value.normalize();
        }
    }
    /**
     * World rotation, defining the rotation by using a unit quaternion.
     */
    get worldRotationQuaternion() {
        const worldRotationQuaternion = this._worldRotationQuaternion;
        if (this._isContainDirtyFlag(TransformFlag.WorldQuat)) {
            //@ts-ignore
            worldRotationQuaternion._onValueChanged = null;
            // const parent = this._getParentTransform();
            {
                this.rotationQuaternion.cloneTo(worldRotationQuaternion);
            }
            //@ts-ignore
            worldRotationQuaternion._onValueChanged = this._onWorldRotationQuaternionChanged;
            this._setDirtyFlagFalse(TransformFlag.WorldQuat);
        }
        return worldRotationQuaternion;
    }
    set worldRotationQuaternion(value) {
        if (this._worldRotationQuaternion !== value) {
            if (value.normalized) {
                value.cloneTo(this._worldRotationQuaternion);
            }
            else {
                Quaternion.normalize(value, this._worldRotationQuaternion);
            }
        }
        value.normalized || value.normalize();
    }
    /**
     * Local scaling.
     */
    get scale() {
        return this._scale;
    }
    set scale(value) {
        if (this._scale !== value) {
            value.cloneTo(this._scale);
        }
    }
    /**
     * Local lossy scaling.
     * @remarks The value obtained may not be correct under certain conditions(for example, the parent node has scaling,
     * and the child node has a rotation), the scaling will be tilted. Vector3 cannot be used to correctly represent the scaling. Must use Matrix3.
     */
    get lossyWorldScale() {
        if (this._isContainDirtyFlag(TransformFlag.WorldScale)) {
            // if (this._getParentTransform()) {
            {
                this._scale.cloneTo(this._lossyWorldScale);
            }
            this._setDirtyFlagFalse(TransformFlag.WorldScale);
        }
        return this._lossyWorldScale;
    }
    /**
     * Local matrix.
     * @remarks Need to re-assign after modification to ensure that the modification takes effect.
     */
    get localMatrix() {
        if (this._isContainDirtyFlag(TransformFlag.LocalMatrix)) {
            Matrix4.affineTransformation(this._scale, this.rotationQuaternion, this._position, this._localMatrix);
            this._setDirtyFlagFalse(TransformFlag.LocalMatrix);
        }
        return this._localMatrix;
    }
    set localMatrix(value) {
        if (this._localMatrix !== value) {
            value.cloneTo(this._localMatrix);
        }
        this._localMatrix.decompose(this._position, this._rotationQuaternion, this._scale);
        this._setDirtyFlagTrue(TransformFlag.LocalEuler);
        this._setDirtyFlagFalse(TransformFlag.LocalMatrix);
        this._updateAllWorldFlag();
    }
    /**
     * World matrix.
     * @remarks Need to re-assign after modification to ensure that the modification takes effect.
     */
    get worldMatrix() {
        if (this._isContainDirtyFlag(TransformFlag.WorldMatrix)) {
            {
                this.localMatrix.cloneTo(this._worldMatrix);
            }
            this._setDirtyFlagFalse(TransformFlag.WorldMatrix);
        }
        return this._worldMatrix;
    }
    set worldMatrix(value) {
        if (this._worldMatrix !== value) {
            value.cloneTo(this._worldMatrix);
        }
        {
            value.cloneTo(this._localMatrix);
        }
        this.localMatrix = this._localMatrix;
        this._setDirtyFlagFalse(TransformFlag.WorldMatrix);
    }
    /**
     * @internal
     */
    constructor(entity = null) {
        this._entity = entity;
        this._onPositionChanged = this._onPositionChanged.bind(this);
        this._onWorldPositionChanged = this._onWorldPositionChanged.bind(this);
        this._onRotationChanged = this._onRotationChanged.bind(this);
        this._onWorldRotationChanged = this._onWorldRotationChanged.bind(this);
        this._onRotationQuaternionChanged = this._onRotationQuaternionChanged.bind(this);
        this._onWorldRotationQuaternionChanged = this._onWorldRotationQuaternionChanged.bind(this);
        this._onScaleChanged = this._onScaleChanged.bind(this);
        //@ts-ignore
        this._position._onValueChanged = this._onPositionChanged;
        //@ts-ignore
        this._worldPosition._onValueChanged = this._onWorldPositionChanged;
        //@ts-ignore
        this._rotation._onValueChanged = this._onRotationChanged;
        //@ts-ignore
        this._worldRotation._onValueChanged = this._onWorldRotationChanged;
        //@ts-ignore
        this._rotationQuaternion._onValueChanged = this._onRotationQuaternionChanged;
        //@ts-ignore
        this._worldRotationQuaternion._onValueChanged = this._onWorldRotationQuaternionChanged;
        //@ts-ignore
        this._scale._onValueChanged = this._onScaleChanged;
    }
    /**
     * Set local position by X, Y, Z value.
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param z - Z coordinate
     */
    setPosition(x, y, z) {
        this._position.setValue(x, y, z);
    }
    /**
     * Set local rotation by the X, Y, Z components of the euler angle, unit in degrees.
     * Rotations are performed around the Y axis, the X axis, and the Z axis, in that order.
     * @param x - The angle of rotation around the X axis
     * @param y - The angle of rotation around the Y axis
     * @param z - The angle of rotation around the Z axis
     */
    setRotation(x, y, z) {
        this._rotation.setValue(x, y, z);
    }
    /**
     * Set local rotation by the X, Y, Z, and W components of the quaternion.
     * @param x - X component of quaternion
     * @param y - Y component of quaternion
     * @param z - Z component of quaternion
     * @param w - W component of quaternion
     */
    setRotationQuaternion(x, y, z, w) {
        this._rotationQuaternion.setValue(x, y, z, w);
    }
    /**
     * Set local scaling by scaling values along X, Y, Z axis.
     * @param x - Scaling along X axis
     * @param y - Scaling along Y axis
     * @param z - Scaling along Z axis
     */
    setScale(x, y, z) {
        this._scale.setValue(x, y, z);
    }
    /**
     * Set world position by X, Y, Z value.
     * @param x - X coordinate
     * @param y - Y coordinate
     * @param z - Z coordinate
     */
    setWorldPosition(x, y, z) {
        this._worldPosition.setValue(x, y, z);
    }
    /**
     * Set world rotation by the X, Y, Z components of the euler angle, unit in degrees, Yaw/Pitch/Roll sequence.
     * @param x - The angle of rotation around the X axis
     * @param y - The angle of rotation around the Y axis
     * @param z - The angle of rotation around the Z axis
     */
    setWorldRotation(x, y, z) {
        this._worldRotation.setValue(x, y, z);
    }
    /**
     * Set local rotation by the X, Y, Z, and W components of the quaternion.
     * @param x - X component of quaternion
     * @param y - Y component of quaternion
     * @param z - Z component of quaternion
     * @param w - W component of quaternion
     */
    setWorldRotationQuaternion(x, y, z, w) {
        this._worldRotationQuaternion.setValue(x, y, z, w);
    }
    /**
     * Get the forward direction in world space.
     * @param forward - Forward vector
     * @returns Forward vector
     */
    getWorldForward(forward) {
        const e = this.worldMatrix.elements;
        forward.setValue(-e[8], -e[9], -e[10]);
        return forward.normalize();
    }
    /**
     * Get the right direction in world space.
     * @param right - Right vector
     * @returns Right vector
     */
    getWorldRight(right) {
        const e = this.worldMatrix.elements;
        right.setValue(e[0], e[1], e[2]);
        return right.normalize();
    }
    /**
     * Get the up direction in world space.
     * @param up - Up vector
     * @returns Up vector
     */
    getWorldUp(up) {
        const e = this.worldMatrix.elements;
        up.setValue(e[4], e[5], e[6]);
        return up.normalize();
    }
    translate(translationOrX, relativeToLocalOrY, z, relativeToLocal) {
        if (typeof translationOrX === 'number') {
            const translate = Transform._tempVec30;
            translate.setValue(translationOrX, relativeToLocalOrY, z);
            this._translate(translate, relativeToLocal);
        }
        else {
            this._translate(translationOrX, relativeToLocalOrY);
        }
    }
    rotate(rotationOrX, relativeToLocalOrY, z, relativeToLocal) {
        if (typeof rotationOrX === 'number') {
            this._rotateXYZ(rotationOrX, relativeToLocalOrY, z, relativeToLocal);
        }
        else {
            this._rotateXYZ(rotationOrX.x, rotationOrX.y, rotationOrX.z, relativeToLocalOrY);
        }
    }
    /**
     * Rotate around the specified axis according to the specified angle.
     * @param axis - Rotate axis
     * @param angle - Rotate angle in degrees
     * @param relativeToLocal - Relative to local space
     */
    rotateByAxis(axis, angle, relativeToLocal = true) {
        const rad = angle * MathUtil.degreeToRadFactor;
        Quaternion.rotationAxisAngle(axis, rad, Transform._tempQuat0);
        this._rotateByQuat(Transform._tempQuat0, relativeToLocal);
    }
    /**
     * Rotate and ensure that the world front vector points to the target world position.
     * @param targetPosition - Target world position
     * @param worldUp - Up direction in world space, default is Vector3(0, 1, 0)
     */
    lookAt(targetPosition, worldUp) {
        const zAxis = Transform._tempVec30;
        Vector3.subtract(this.worldPosition, targetPosition, zAxis);
        let axisLen = zAxis.length();
        if (axisLen <= MathUtil.zeroTolerance) {
            // The current position and the target position are almost the same.
            return;
        }
        zAxis.scale(1 / axisLen);
        const xAxis = Transform._tempVec31;
        if (worldUp) {
            Vector3.cross(worldUp, zAxis, xAxis);
        }
        else {
            xAxis.setValue(zAxis.z, 0, -zAxis.x);
        }
        axisLen = xAxis.length();
        if (axisLen <= MathUtil.zeroTolerance) {
            // @todo:
            // 1.worldup is（0,0,0）
            // 2.worldUp is parallel to zAxis
            return;
        }
        xAxis.scale(1 / axisLen);
        const yAxis = Transform._tempVec32;
        Vector3.cross(zAxis, xAxis, yAxis);
        const rotMat = Transform._tempMat41;
        const { elements: e } = rotMat;
        (e[0] = xAxis.x), (e[1] = xAxis.y), (e[2] = xAxis.z);
        (e[4] = yAxis.x), (e[5] = yAxis.y), (e[6] = yAxis.z);
        (e[8] = zAxis.x), (e[9] = zAxis.y), (e[10] = zAxis.z);
        rotMat.getRotation(this._worldRotationQuaternion);
    }
    /**
     * Register world transform change flag.
     * @returns Change flag
     */
    registerWorldChangeFlag() {
        return this._updateFlagManager.createFlag(BoolUpdateFlag);
    }
    /**
     * @internal
     */
    _parentChange() {
        this._isParentDirty = true;
        this._updateAllWorldFlag();
    }
    /**
     * @internal
     */
    _isFrontFaceInvert() {
        const scale = this.lossyWorldScale;
        let isInvert = scale.x < 0;
        scale.y < 0 && (isInvert = !isInvert);
        scale.z < 0 && (isInvert = !isInvert);
        return isInvert;
    }
    /**
     * Get worldMatrix: Will trigger the worldMatrix update of itself and all parent entities.
     * Get worldPosition: Will trigger the worldMatrix, local position update of itself and the worldMatrix update of all parent entities.
     * In summary, any update of related variables will cause the dirty mark of one of the full process (worldMatrix or worldRotationQuaternion) to be false.
     */
    _updateWorldPositionFlag() {
        if (!this._isContainDirtyFlags(TransformFlag.WmWp)) {
            this._worldAssociatedChange(TransformFlag.WmWp);
            // const nodeChildren = this._entity._children;
            const nodeChildren = [];
            for (let i = 0, n = nodeChildren.length; i < n; i++) {
                nodeChildren[i].transform?._updateWorldPositionFlag();
            }
        }
    }
    /**
     * Get worldMatrix: Will trigger the worldMatrix update of itself and all parent entities.
     * Get worldPosition: Will trigger the worldMatrix, local position update of itself and the worldMatrix update of all parent entities.
     * Get worldRotationQuaternion: Will trigger the world rotation (in quaternion) update of itself and all parent entities.
     * Get worldRotation: Will trigger the world rotation(in euler and quaternion) update of itself and world rotation(in quaternion) update of all parent entities.
     * In summary, any update of related variables will cause the dirty mark of one of the full process (worldMatrix or worldRotationQuaternion) to be false.
     */
    _updateWorldRotationFlag() {
        if (!this._isContainDirtyFlags(TransformFlag.WmWeWq)) {
            this._worldAssociatedChange(TransformFlag.WmWeWq);
            // const nodeChildren = this._entity._children;
            const nodeChildren = [];
            for (let i = 0, n = nodeChildren.length; i < n; i++) {
                nodeChildren[i].transform?._updateWorldPositionAndRotationFlag(); // Rotation update of parent entity will trigger world position and rotation update of all child entity.
            }
        }
    }
    /**
     * Get worldMatrix: Will trigger the worldMatrix update of itself and all parent entities.
     * Get worldPosition: Will trigger the worldMatrix, local position update of itself and the worldMatrix update of all parent entities.
     * Get worldRotationQuaternion: Will trigger the world rotation (in quaternion) update of itself and all parent entities.
     * Get worldRotation: Will trigger the world rotation(in euler and quaternion) update of itself and world rotation(in quaternion) update of all parent entities.
     * In summary, any update of related variables will cause the dirty mark of one of the full process (worldMatrix or worldRotationQuaternion) to be false.
     */
    _updateWorldPositionAndRotationFlag() {
        if (!this._isContainDirtyFlags(TransformFlag.WmWpWeWq)) {
            this._worldAssociatedChange(TransformFlag.WmWpWeWq);
            // const nodeChildren = this._entity._children;
            const nodeChildren = [];
            for (let i = 0, n = nodeChildren.length; i < n; i++) {
                nodeChildren[i].transform?._updateWorldPositionAndRotationFlag();
            }
        }
    }
    /**
     * Get worldMatrix: Will trigger the worldMatrix update of itself and all parent entities.
     * Get worldPosition: Will trigger the worldMatrix, local position update of itself and the worldMatrix update of all parent entities.
     * Get worldScale: Will trigger the scaling update of itself and all parent entities.
     * In summary, any update of related variables will cause the dirty mark of one of the full process (worldMatrix) to be false.
     */
    _updateWorldScaleFlag() {
        if (!this._isContainDirtyFlags(TransformFlag.WmWs)) {
            this._worldAssociatedChange(TransformFlag.WmWs);
            // const nodeChildren = this._entity._children;
            const nodeChildren = [];
            for (let i = 0, n = nodeChildren.length; i < n; i++) {
                nodeChildren[i].transform?._updateWorldPositionAndScaleFlag();
            }
        }
    }
    /**
     * Get worldMatrix: Will trigger the worldMatrix update of itself and all parent entities.
     * Get worldPosition: Will trigger the worldMatrix, local position update of itself and the worldMatrix update of all parent entities.
     * Get worldScale: Will trigger the scaling update of itself and all parent entities.
     * In summary, any update of related variables will cause the dirty mark of one of the full process (worldMatrix) to be false.
     */
    _updateWorldPositionAndScaleFlag() {
        if (!this._isContainDirtyFlags(TransformFlag.WmWpWs)) {
            this._worldAssociatedChange(TransformFlag.WmWpWs);
            // const nodeChildren = this._entity._children;
            const nodeChildren = [];
            for (let i = 0, n = nodeChildren.length; i < n; i++) {
                nodeChildren[i].transform?._updateWorldPositionAndScaleFlag();
            }
        }
    }
    /**
     * Update all world transform property dirty flag, the principle is the same as above.
     */
    _updateAllWorldFlag() {
        if (!this._isContainDirtyFlags(TransformFlag.WmWpWeWqWs)) {
            this._worldAssociatedChange(TransformFlag.WmWpWeWqWs);
            // const nodeChildren = this._entity._children;
            const nodeChildren = [];
            for (let i = 0, n = nodeChildren.length; i < n; i++) {
                nodeChildren[i].transform?._updateAllWorldFlag();
            }
        }
    }
    _getParentTransform() {
        if (!this._isParentDirty) {
            return this._parentTransformCache;
        }
        let parentCache = null;
        let parent = this._entity.parent;
        while (parent) {
            const transform = parent.transform;
            if (transform) {
                parentCache = transform;
                break;
            }
            else {
                parent = parent.parent;
            }
        }
        this._parentTransformCache = parentCache;
        this._isParentDirty = false;
        return parentCache;
    }
    _getScaleMatrix() {
        const invRotation = Transform._tempQuat0;
        const invRotationMat = Transform._tempMat30;
        const worldRotScaMat = Transform._tempMat31;
        const scaMat = Transform._tempMat32;
        worldRotScaMat.setValueByMatrix(this.worldMatrix);
        Quaternion.invert(this.worldRotationQuaternion, invRotation);
        Matrix3.rotationQuaternion(invRotation, invRotationMat);
        Matrix3.multiply(invRotationMat, worldRotScaMat, scaMat);
        return scaMat;
    }
    _isContainDirtyFlags(targetDirtyFlags) {
        return (this._dirtyFlag & targetDirtyFlags) === targetDirtyFlags;
    }
    _isContainDirtyFlag(type) {
        return (this._dirtyFlag & type) != 0;
    }
    _setDirtyFlagTrue(type) {
        this._dirtyFlag |= type;
    }
    _setDirtyFlagFalse(type) {
        this._dirtyFlag &= ~type;
    }
    _worldAssociatedChange(type) {
        this._dirtyFlag |= type;
        this._updateFlagManager.dispatch();
    }
    _rotateByQuat(rotateQuat, relativeToLocal) {
        if (relativeToLocal) {
            Quaternion.multiply(this.rotationQuaternion, rotateQuat, this._rotationQuaternion);
        }
        else {
            Quaternion.multiply(rotateQuat, this.worldRotationQuaternion, this._worldRotationQuaternion);
        }
    }
    _translate(translation, relativeToLocal = true) {
        if (relativeToLocal) {
            this._position.add(translation);
        }
        else {
            this._worldPosition.add(translation);
        }
    }
    _rotateXYZ(x, y, z, relativeToLocal = true) {
        const radFactor = MathUtil.degreeToRadFactor;
        const rotQuat = Transform._tempQuat0;
        Quaternion.rotationEuler(x * radFactor, y * radFactor, z * radFactor, rotQuat);
        this._rotateByQuat(rotQuat, relativeToLocal);
    }
    _onPositionChanged() {
        this._setDirtyFlagTrue(TransformFlag.LocalMatrix);
        this._updateWorldPositionFlag();
    }
    _onWorldPositionChanged() {
        const worldPosition = this._worldPosition;
        {
            worldPosition.cloneTo(this._position);
        }
        this._setDirtyFlagFalse(TransformFlag.WorldPosition);
    }
    _onRotationChanged() {
        this._setDirtyFlagTrue(TransformFlag.LocalMatrix | TransformFlag.LocalQuat);
        this._setDirtyFlagFalse(TransformFlag.LocalEuler);
        this._updateWorldRotationFlag();
    }
    _onWorldRotationChanged() {
        const worldRotation = this._worldRotation;
        Quaternion.rotationEuler(MathUtil.degreeToRadian(worldRotation.x), MathUtil.degreeToRadian(worldRotation.y), MathUtil.degreeToRadian(worldRotation.z), this._worldRotationQuaternion);
        this._setDirtyFlagFalse(TransformFlag.WorldEuler);
    }
    _onRotationQuaternionChanged() {
        this._setDirtyFlagTrue(TransformFlag.LocalMatrix | TransformFlag.LocalEuler);
        this._setDirtyFlagFalse(TransformFlag.LocalQuat);
        this._updateWorldRotationFlag();
    }
    _onWorldRotationQuaternionChanged() {
        const worldRotationQuaternion = this._worldRotationQuaternion;
        {
            worldRotationQuaternion.cloneTo(this._rotationQuaternion);
        }
        this._setDirtyFlagFalse(TransformFlag.WorldQuat);
    }
    _onScaleChanged() {
        this._setDirtyFlagTrue(TransformFlag.LocalMatrix);
        this._updateWorldScaleFlag();
    }
}
/**
 * Dirty flag of transform.
 */
var TransformFlag;
(function (TransformFlag) {
    TransformFlag[TransformFlag["LocalEuler"] = 1] = "LocalEuler";
    TransformFlag[TransformFlag["LocalQuat"] = 2] = "LocalQuat";
    TransformFlag[TransformFlag["WorldPosition"] = 4] = "WorldPosition";
    TransformFlag[TransformFlag["WorldEuler"] = 8] = "WorldEuler";
    TransformFlag[TransformFlag["WorldQuat"] = 16] = "WorldQuat";
    TransformFlag[TransformFlag["WorldScale"] = 32] = "WorldScale";
    TransformFlag[TransformFlag["LocalMatrix"] = 64] = "LocalMatrix";
    TransformFlag[TransformFlag["WorldMatrix"] = 128] = "WorldMatrix";
    /** WorldMatrix | WorldPosition */
    // 132
    TransformFlag[TransformFlag["WmWp"] = 132] = "WmWp";
    /** WorldMatrix | WorldEuler | WorldQuat */
    // 152
    TransformFlag[TransformFlag["WmWeWq"] = 152] = "WmWeWq";
    /** WorldMatrix | WorldPosition | WorldEuler | WorldQuat */
    // 156
    TransformFlag[TransformFlag["WmWpWeWq"] = 156] = "WmWpWeWq";
    /** WorldMatrix | WorldScale */
    // 160
    TransformFlag[TransformFlag["WmWs"] = 160] = "WmWs";
    /** WorldMatrix | WorldPosition | WorldScale */
    // 164
    TransformFlag[TransformFlag["WmWpWs"] = 164] = "WmWpWs";
    /** WorldMatrix | WorldPosition | WorldEuler | WorldQuat | WorldScale */
    // 11 * 16 + 12 = 188
    TransformFlag[TransformFlag["WmWpWeWqWs"] = 188] = "WmWpWeWqWs";
})(TransformFlag || (TransformFlag = {}));

/**
 * Camera.
 */
class Camera {
    // 把引擎也引进来主要是为了获取到canvas的宽高
    // 便于设置透视投影矩阵与宽高比
    // TODO待重构，抽出一个Component
    _engine;
    // 主要是为了让OrbitControl获取到canvas
    get engine() {
        return this._engine;
    }
    transform;
    static _viewMatrixProperty = Shader.getPropertyByName('u_viewMat');
    static _projectionMatrixProperty = Shader.getPropertyByName('u_projMat');
    static _inverseVPMatrixProperty = Shader.getPropertyByName('u_invVPMat');
    /**
     * Compute the inverse of the rotation translation matrix.
     * @param rotation - The rotation used to calculate matrix
     * @param translation - The translation used to calculate matrix
     * @param out - The calculated matrix
     */
    static _rotationTranslationInv(rotation, translation, out) {
        const oe = out.elements;
        const { x, y, z, w } = rotation;
        let x2 = x + x;
        let y2 = y + y;
        let z2 = z + z;
        let xx = x * x2;
        let xy = x * y2;
        let xz = x * z2;
        let yy = y * y2;
        let yz = y * z2;
        let zz = z * z2;
        let wx = w * x2;
        let wy = w * y2;
        let wz = w * z2;
        oe[0] = 1 - (yy + zz);
        oe[1] = xy + wz;
        oe[2] = xz - wy;
        oe[3] = 0;
        oe[4] = xy - wz;
        oe[5] = 1 - (xx + zz);
        oe[6] = yz + wx;
        oe[7] = 0;
        oe[8] = xz + wy;
        oe[9] = yz - wx;
        oe[10] = 1 - (xx + yy);
        oe[11] = 0;
        oe[12] = translation.x;
        oe[13] = translation.y;
        oe[14] = translation.z;
        oe[15] = 1;
        out.invert();
    }
    /** Shader data. */
    shaderData = new ShaderData(ShaderDataGroup.Camera);
    /** Rendering priority - A Camera with higher priority will be rendered on top of a camera with lower priority. */
    priority = 0;
    orbitControl;
    _isOrthographic = false;
    _nearClipPlane = 0.1;
    _farClipPlane = 100;
    _fieldOfView = 45;
    _orthographicSize = 10;
    // TODO
    _customAspectRatio = undefined;
    _projectionMatrix = new Matrix4();
    _viewMatrix = new Matrix4();
    _viewport = new Vector4(0, 0, 1, 1);
    // 这个东西有什么用呢
    _lastAspectSize = new Vector2(0, 0);
    get viewMatrix() {
        Camera._rotationTranslationInv(this.transform.worldRotationQuaternion, this.transform.worldPosition, this._viewMatrix);
        return this._viewMatrix;
    }
    set projectionMatrix(value) {
        this._projectionMatrix = value;
    }
    get projectionMatrix() {
        const canvas = this._engine.canvas;
        this._lastAspectSize.x = canvas.width;
        this._lastAspectSize.y = canvas.height;
        const aspectRatio = this.aspectRatio;
        if (!this._isOrthographic) {
            Matrix4.perspective(MathUtil.degreeToRadian(this._fieldOfView), aspectRatio, this._nearClipPlane, this._farClipPlane, this._projectionMatrix);
        }
        else {
            const width = this._orthographicSize * aspectRatio;
            const height = this._orthographicSize;
            Matrix4.ortho(-width, width, -height, height, this._nearClipPlane, this._farClipPlane, this._projectionMatrix);
        }
        return this._projectionMatrix;
    }
    /**
     * Near clip plane - the closest point to the camera when rendering occurs.
     */
    get nearClipPlane() {
        return this._nearClipPlane;
    }
    set nearClipPlane(value) {
        this._nearClipPlane = value;
    }
    /**
     * Far clip plane - the furthest point to the camera when rendering occurs.
     */
    get farClipPlane() {
        return this._farClipPlane;
    }
    set farClipPlane(value) {
        this._farClipPlane = value;
    }
    /**
     * The camera's view angle. activating when camera use perspective projection.
     */
    get fieldOfView() {
        return this._fieldOfView;
    }
    set fieldOfView(value) {
        this._fieldOfView = value;
    }
    // 获取宽高比
    get aspectRatio() {
        const canvas = this._engine.canvas;
        // TODO: 考虑视口
        return this._customAspectRatio ?? (canvas.width * this._viewport.z) / (canvas.height * this._viewport.w);
    }
    set aspectRatio(value) {
        this._customAspectRatio = value;
    }
    /**
     * Viewport, normalized expression, the upper left corner is (0, 0), and the lower right corner is (1, 1).
     * @remarks Re-assignment is required after modification to ensure that the modification takes effect.
     */
    get viewport() {
        return this._viewport;
    }
    set viewport(value) {
        if (value !== this._viewport) {
            value.cloneTo(this._viewport);
        }
    }
    /**
     * Whether it is orthogonal, the default is false. True will use orthographic projection, false will use perspective projection.
     */
    get isOrthographic() {
        return this._isOrthographic;
    }
    set isOrthographic(value) {
        this._isOrthographic = value;
    }
    get orthographicSize() {
        return this._orthographicSize;
    }
    set orthographicSize(value) {
        this._orthographicSize = value;
    }
    // TODO： 其实Entity和Camera应该再抽象上一层Component
    constructor(engine) {
        this._engine = engine;
        this.transform = new Transform();
        this.orbitControl = new OrbitControl(this);
    }
    /**
     * Upload camera-related shader data.
     */
    _updateShaderData() {
        const shaderData = this.shaderData;
        const invVPMat = new Matrix4();
        Matrix4.multiply(this.viewMatrix, this.projectionMatrix, invVPMat);
        invVPMat.invert();
        // TODO: 应该把VP矩阵都成好再传给gl，封装common shader的时候再做
        shaderData.setMatrix(Camera._viewMatrixProperty, this.viewMatrix);
        shaderData.setMatrix(Camera._projectionMatrixProperty, this.projectionMatrix);
        shaderData.setMatrix(Camera._inverseVPMatrixProperty, invVPMat);
    }
    /**
     * The upload method is triggered by render.
     */
    render() {
        this._updateShaderData();
    }
}

/**
 * Entity classes in the scene.
 */
class Entity {
    /** Entity count. */
    static _count = 1;
    /** Entity count. */
    id;
    name;
    mesh;
    material;
    parent;
    /** Entity childrens. */
    _children;
    transform;
    /**
     * An entity consists of meshes and materials.
     * @param name Entity name.
     * @param mesh Entity mesh.
     * @param material Entity material.
     */
    constructor(name, mesh, material) {
        this.name = name;
        this.id = Entity._count++;
        this.mesh = mesh;
        this.material = material;
        this.transform = new Transform(this);
    }
    /**
     * Add child entities.
     * @param entity Child entities to be loaded.
     * @returns The number of child entities.
     */
    addEntity(entity) {
        if (entity instanceof Entity) {
            if (this._children == null) {
                this._children = [];
            }
            this._children.push(entity);
        }
        return this._children.length;
    }
}

/**
 * Lighting model base class.
 */
class Light {
    // TODO: 这个抽的不好，只有点光源需要位
    /** Light source position. */
    transform;
    _viewMat;
    _inverseViewMat;
    // 这个暂时没什么用
    // 因为我们的点光源采用的是世界坐标系
    /**
     * Get the view matrix of the light source position.
     */
    get viewMatrix() {
        if (!this._viewMat)
            this._viewMat = new Matrix4();
        Matrix4.invert(this.transform.worldMatrix, this._viewMat);
        return this._viewMat;
    }
    /**
     * Get the inverse of the view matrix for the light source position.
     */
    get inverseViewMatrix() {
        if (!this._inverseViewMat)
            this._inverseViewMat = new Matrix4();
        Matrix4.invert(this.viewMatrix, this._inverseViewMat);
        return this._inverseViewMat;
    }
    constructor() {
        this.transform = new Transform();
    }
}

/**
 * Point light.
 */
class PointLight extends Light {
    // 因为可能有多个点光源
    /** Get the address of the point light color uniform variable in the shader. */
    static _colorProperty = Shader.getPropertyByName('u_pointLightColor');
    /** Get the address of the uniform variable of the point light position in the shader. */
    static _positionProperty = Shader.getPropertyByName('u_pointLightPosition');
    /** Blend object of color and position. */
    static _combinedData = {
        color: new Float32Array(3),
        position: new Float32Array(3),
    };
    // 白光不管和什么光相乘，都保留颜色
    /** The color of the light, the default is white light. */
    color = new Color(1, 1, 1, 1);
    /** Intensity of light. */
    intensity = 1.0;
    /** Final light color. */
    _lightColor = new Color(1, 1, 1, 1);
    /** Get the position of a point light. */
    get position() {
        return this.transform.worldPosition;
    }
    /**
     * Get the final light color.
     */
    get lightColor() {
        this._lightColor.r = this.color.r * this.intensity;
        this._lightColor.g = this.color.g * this.intensity;
        this._lightColor.b = this.color.b * this.intensity;
        this._lightColor.a = this.color.a * this.intensity;
        return this._lightColor;
    }
    constructor(position) {
        super();
        this.transform.worldPosition = position;
    }
    /**
     * Set variable value in shader.
     * @param shaderData Shader data.
     */
    _updateShaderData(shaderData) {
        this._appendData();
        const data = PointLight._combinedData;
        shaderData.setFloatArray(PointLight._colorProperty, data.color);
        shaderData.setFloatArray(PointLight._positionProperty, data.position);
    }
    /**
     * Populate federated data.
     */
    _appendData() {
        const data = PointLight._combinedData;
        const lightColor = this.lightColor;
        const lightPosition = this.position;
        data.color[0] = lightColor.r;
        data.color[1] = lightColor.g;
        data.color[2] = lightColor.b;
        data.position[0] = lightPosition.x;
        data.position[1] = lightPosition.y;
        data.position[2] = lightPosition.z;
    }
}

// 这个不用继承Light，因为只需要颜色
/**
 * Ambient light.
 */
class AmbientLight {
    /** Get the address of the point ambient color uniform variable in the shader. */
    static _colorProperty = Shader.getPropertyByName('u_ambientightColor');
    /** The color of the light. */
    color;
    constructor(color) {
        this.color = color;
    }
    /**
     * Set variable value in shader.
     * @param shaderData Shader data.
     */
    _updateShaderData(shaderData) {
        const color = this.color;
        const ambientColor = new Float32Array([color.r, color.g, color.b]);
        shaderData.setFloatArray(AmbientLight._colorProperty, ambientColor);
    }
}

// TODO: 抽象出来一个EngineObject!!!!
class Scene {
    shaderData = new ShaderData(ShaderDataGroup.Scene);
    /** The engine the scene belongs to. */
    engine;
    /** A collection of entities in the scene, which is a tree. */
    entities;
    /** Cameras in the scene, we only consider the case where there is only one camera in the scene. */
    camera;
    // TODO: 要想在这里使用你就的先抽象出来
    /** The background of the scene, the default is the skybox. */
    background;
    // TODO: 可能有多个点光源
    /** Point lights in the scene. */
    pointLight;
    /** Ambient light in the scene. */
    ambientLight;
    /** Earth is the root entity in the scene. */
    _rootEntity;
    get rootEntity() {
        const shader = Shader.find('common');
        const material = new ImageMaterial(this.engine, shader, earthUrl);
        const mesh = PrimitiveMesh.createSphereByParamEquation(this.engine, 1, 40);
        this._rootEntity = new Entity('rootEntity', mesh, material);
        return this._rootEntity;
    }
    /**
     * The camera and the earth are loaded by default inside the constructor.
     * @param engine The engine the scene belongs to.
     */
    constructor(engine) {
        this.engine = engine;
        this.camera = new Camera(engine);
        this.camera.transform.position = new Vector3(0, 0, 3);
        this.camera.transform.lookAt(new Vector3(0, 0, 0));
        this.background = new Background(this.engine);
        this.entities = [this.rootEntity];
        this.pointLight = new PointLight(new Vector3(0, 0, 10));
        this.pointLight._updateShaderData(this.shaderData);
        this.ambientLight = new AmbientLight(new Color(0.2, 0.2, 0.2, 1));
        this.ambientLight._updateShaderData(this.shaderData);
    }
    /**
     * Entities that need to be loaded into the scene, at the same level as the Earth.
     * @param entity Entity.
     * @returns The number of entities.
     */
    addEntity(entity) {
        if (entity instanceof Entity) {
            if (this.entities == null) {
                this.entities = [];
            }
            this.entities.push(entity);
        }
        return this.entities.length;
    }
}

/**
 * Encapsulate canvas tag.
 */
class Canvas {
    /** HTML canvas element. */
    _canvas;
    _width;
    _height;
    /** Canvas element width. */
    get width() {
        return this._width;
    }
    set width(value) {
        if (this._width !== value) {
            this._canvas.width = value;
            this._width = value;
        }
    }
    /** Canvas element height. */
    get height() {
        return this._height;
    }
    set height(value) {
        if (this._height !== value) {
            this._canvas.height = value;
            this._height = value;
        }
    }
    /**
     * Resize by client size.
     * @param pixelRatio Device pixel ratio.
     */
    resizeByClientSize(pixelRatio = window.devicePixelRatio) {
        const webCanvas = this._canvas;
        if (webCanvas instanceof HTMLCanvasElement) {
            this.width = webCanvas.clientWidth * pixelRatio;
            this.height = webCanvas.clientHeight * pixelRatio;
        }
    }
    /**
     * Wrap the canvas element.
     * @param canvas HTML canvas element.
     */
    constructor(canvas) {
        const width = canvas.width;
        const height = canvas.height;
        this._canvas = canvas;
        this._width = width;
        this._height = height;
        // TODO: 做的不好，应该想个优雅的方法
        window.addEventListener('resize', () => {
            this.resizeByClientSize();
        });
    }
}

/**
 * Tools for calculating the time per frame.
 */
class Time {
    _clock;
    _timeScale;
    _deltaTime;
    _startTime;
    _lastTickTime;
    /**
     * Constructor of the Time.
     */
    constructor() {
        this._clock = performance ? performance : Date;
        this._timeScale = 1.0;
        this._deltaTime = 0.0001;
        const now = this._clock.now();
        this._startTime = now;
        this._lastTickTime = now;
    }
    /**
     * Set the current time as the end of rendering marker.
     */
    reset() {
        this._lastTickTime = this._clock.now();
    }
    /**
     * Current Time
     */
    get nowTime() {
        return this._clock.now();
    }
    /**
     * Time between two ticks
     */
    get deltaTime() {
        return this._deltaTime;
    }
    /**
     * Scaled delta time.
     */
    get timeScale() {
        return this._timeScale;
    }
    set timeScale(s) {
        this._timeScale = s;
    }
    /**
     * Unscaled delta time.
     */
    get unscaledDeltaTime() {
        return this._deltaTime / this._timeScale;
    }
    /**
     * The elapsed time, after the clock is initialized.
     */
    get timeSinceStartup() {
        return this.nowTime - this._startTime;
    }
    /**
     * Call every frame, update delta time and other data.
     */
    tick() {
        const now = this.nowTime;
        this._deltaTime = (now - this._lastTickTime) * this._timeScale;
        this._lastTickTime = now;
    }
}

var skyboxFs = "precision mediump float;\n#define GLSLIFY 1\nuniform samplerCube u_Skybox;uniform mat4 u_invVPMat;varying vec4 v_position;void main(){vec4 t=u_invVPMat*v_position;gl_FragColor=textureCube(u_Skybox,normalize(t.xyz/t.w));}"; // eslint-disable-line

var skyboxVs = "#define GLSLIFY 1\nattribute vec3 POSITION;varying vec4 v_position;void main(){gl_Position=vec4(POSITION,1.0);v_position=gl_Position;gl_Position.z=1.0;}"; // eslint-disable-line

var commonFs = "precision mediump float;\n#define GLSLIFY 1\nvarying vec3 v_worldPostion;varying vec2 v_TexCoord;uniform sampler2D u_Sampler;uniform vec3 u_pointLightPosition;uniform vec3 u_pointLightColor;uniform vec3 u_ambientightColor;void main(){vec3 normal=normalize(v_worldPostion);vec3 lightDirection=normalize(u_pointLightPosition-v_worldPostion);float nDotL=max(dot(lightDirection,normal),0.0);vec4 textureColor=texture2D(u_Sampler,v_TexCoord);vec3 diffuse=u_pointLightColor*textureColor.rgb*nDotL;vec3 ambient=u_ambientightColor*textureColor.rgb;gl_FragColor=vec4(diffuse+ambient,textureColor.a);}"; // eslint-disable-line

var commonVs = "#define GLSLIFY 1\nattribute vec3 POSITION;attribute vec3 NORMAL;attribute vec2 TEXCOORD_0;uniform mat4 u_viewMat;uniform mat4 u_projMat;varying vec3 v_worldPostion;varying vec2 v_TexCoord;void main(){gl_Position=u_projMat*u_viewMat*vec4(POSITION,1.0);v_worldPostion=POSITION;v_TexCoord=TEXCOORD_0;}"; // eslint-disable-line

/**
 * Engine built-in shader pool.
 */
class ShaderPool {
    /**
     * Created by Shader based on fragment and vertex shader code.
     */
    static init() {
        Shader.create('skybox', skyboxVs, skyboxFs);
        Shader.create('common', commonVs, commonFs);
    }
}

// 引入引擎的时候就将ShaderPool进行初始化
ShaderPool.init();
/**
 * The engine is the big steward of all content.
 */
class Engine {
    /** The canvas corresponding to the engine. */
    _canvas;
    // TODO: 考虑接入WebGL2.
    /** WebGL rendering context. */
    _gl;
    /** Current active scene. */
    activeScene;
    /** Used to calculate the interval between each frame rendering. */
    _time = new Time();
    /** Easy to destroy RAF. */
    _requestId;
    /** Rendered 2D texture when the image has not been loaded yet. */
    _whiteTexture2D;
    /** Rendered cube texture when the image has not been loaded yet. */
    _whiteTextureCube;
    get canvas() {
        return this._canvas;
    }
    get gl() {
        return this._gl;
    }
    get time() {
        return this._time;
    }
    /**
     * Animation rendering.
     */
    _animate = () => {
        this._requestId = requestAnimationFrame(this._animate);
        this.update();
    };
    /**
     * Engine instance.
     * @param canvasId HTML canvas id.
     */
    constructor(canvasId) {
        const canvas = document.getElementById(canvasId);
        if (canvas instanceof HTMLCanvasElement) {
            this._canvas = new Canvas(canvas);
            this._canvas.resizeByClientSize();
        }
        else {
            throw `canvas is not a HTMLCanvasElement!`;
        }
        const gl = canvas.getContext('webgl', {});
        if (!gl)
            throw `init webgl rendering context failure!`;
        this._gl = gl;
        // ! 这样实例化场景好吗？？？
        this.activeScene = new Scene(this);
        const whitePixel = new Uint8Array([255, 255, 255, 255]);
        const whiteTexture2D = new Texture2D(this, 1, 1, TextureFormat.R8G8B8A8, false);
        whiteTexture2D.setPixelBuffer(whitePixel);
        const whiteTextureCube = new TextureCube(this, 1, TextureFormat.R8G8B8A8, false);
        whiteTextureCube.setPixelBuffer(TextureCubeFace.PositiveX, whitePixel);
        whiteTextureCube.setPixelBuffer(TextureCubeFace.NegativeX, whitePixel);
        whiteTextureCube.setPixelBuffer(TextureCubeFace.PositiveY, whitePixel);
        whiteTextureCube.setPixelBuffer(TextureCubeFace.NegativeY, whitePixel);
        whiteTextureCube.setPixelBuffer(TextureCubeFace.PositiveZ, whitePixel);
        whiteTextureCube.setPixelBuffer(TextureCubeFace.NegativeZ, whitePixel);
        this._whiteTexture2D = whiteTexture2D;
        this._whiteTextureCube = whiteTextureCube;
    }
    /**
     * Update all data.
     */
    update() {
        const time = this._time;
        const deltaTime = time.deltaTime;
        const camera = this.activeScene.camera;
        // 更新相机位置信息
        camera.orbitControl.onUpdate(deltaTime);
        time.tick();
        this._render();
    }
    /**
     * Render based on updated data.
     */
    _render() {
        const gl = this._gl;
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        // 这个放这没问题，不然背景画不出来
        gl.depthFunc(gl.LESS);
        // TODO: 这些状态不应该每次都进行获取
        const scene = this.activeScene;
        const entities = scene.entities;
        const camera = scene.camera;
        camera && camera.render();
        // TODO: 这里要改成递归场景树渲染
        entities.forEach((entity) => {
            const { mesh, material } = entity;
            // ! 这里每次都要去编译shader代码！！！
            // TODO: ShaderProgramPool
            const program = material.shader._getShaderProgram(this);
            // 上传相机的数据，这里还需要上传其他模块的数据，比如：场景，材质等
            // 场景的shaderData主要是光线
            // ! 这里每个实体都要
            program.uploadAll(program.sceneUniformBlock, scene.shaderData);
            program.uploadAll(program.cameraUniformBlock, camera.shaderData);
            program.uploadAll(program.materialUniformBlock, material.shaderData);
            mesh._draw(program, mesh.subMesh);
        });
        // 最后渲染背景
        gl.depthFunc(gl.LEQUAL);
        const { _mesh, _material } = scene.background;
        // ! 每次渲染都去实例化不可以！而且bind不应该放在构造函数，否则无法切换program
        const skyProgram = _material.shader._getShaderProgram(this);
        skyProgram.uploadAll(skyProgram.cameraUniformBlock, camera.shaderData);
        skyProgram.uploadAll(skyProgram.materialUniformBlock, _material.shaderData);
        _mesh._draw(skyProgram, _mesh.subMesh);
    }
    /**
     * Timing and rendering.
     */
    resume() {
        this.time.reset();
        this._requestId = requestAnimationFrame(this._animate);
    }
    /**
     * Engine run.
     */
    run() {
        this.resume();
    }
}

export { Buffer, BufferBindFlag, BufferUsage, BufferUtil, Camera, Canvas, Color, DataType, Engine, Entity, GLCapabilityType, ImageMaterial, IndexBufferBinding, IndexFormat, Material, MathUtil, Matrix3, Matrix4, Mesh, MeshTopology, ModelMesh, ObjectValues, OrbitControl, PrimitiveMesh, Quaternion, Renderer, Scene, Shader, ShaderData, ShaderDataGroup, ShaderProgram, ShaderProperty, ShaderUniform, ShaderUniformBlock, Spherical, SubMesh, Time, Transform, Util, Vector2, Vector3, Vector4, VertexBufferBinding, VertexElement, VertexElementFormat, earthUrl, isArrayLike, removeFromArray, skyStarConfig };
