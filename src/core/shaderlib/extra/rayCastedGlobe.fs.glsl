precision mediump float;

const float oneOverTwoPi = 0.15915494309189535;
const float oneOverPi = 0.3183098861837907;

varying vec3 v_worldPosition;
uniform vec3 u_cameraPos;
uniform vec3 u_cameraPosSquared;
uniform vec3 u_globeOneOverRadiiSquared;
uniform vec3 u_pointLightPosition;
uniform vec4 u_diffuseSpecularAmbientShininess;
uniform sampler2D u_sampler;


struct Intersection
{
    bool  Intersects;
    float NearTime;
    float FarTime;
};

Intersection RayIntersectEllipsoid(vec3 rayOrigin, vec3 rayOriginSquared, vec3 rayDirection, vec3 oneOverEllipsoidRadiiSquared)
{
    float a = dot(rayDirection * rayDirection, oneOverEllipsoidRadiiSquared);
    float b = 2.0 * dot(rayOrigin * rayDirection, oneOverEllipsoidRadiiSquared);
    float c = dot(rayOriginSquared, oneOverEllipsoidRadiiSquared) - 1.0;
    float discriminant = b * b - 4.0 * a * c;

    if (discriminant < 0.0)
    {
        return Intersection(false, 0.0, 0.0);
    }
    else if (discriminant == 0.0)
    {
        float time = -0.5 * b / a;
        return Intersection(true, time, time);
    }

    float t = -0.5 * (b + (b > 0.0 ? 1.0 : -1.0) * sqrt(discriminant));
    float root1 = t / a;
    float root2 = c / t;

    return Intersection(true, min(root1, root2), max(root1, root2));
}

vec3 GeodeticSurfaceNormal(vec3 positionOnEllipsoid, vec3 oneOverEllipsoidRadiiSquared)
{
    return normalize(positionOnEllipsoid * oneOverEllipsoidRadiiSquared);
}

float LightIntensity(vec3 normal, vec3 toLight, vec3 toEye, vec4 diffuseSpecularAmbientShininess)
{
    vec3 toReflectedLight = reflect(-toLight, normal);

    float diffuse = max(dot(toLight, normal), 0.0);
    float specular = max(dot(toReflectedLight, toEye), 0.0);
    specular = pow(specular, diffuseSpecularAmbientShininess.w);

    return (diffuseSpecularAmbientShininess.x * diffuse) +
        (diffuseSpecularAmbientShininess.y * specular) +
            diffuseSpecularAmbientShininess.z;
}

vec2 ComputeTextureCoordinates(vec3 normal)
{
    return vec2(atan(normal.y, normal.x) * oneOverTwoPi + 0.5, asin(normal.z) * oneOverPi + 0.5);
}

void main()
{
    vec3 rayDirection = normalize(v_worldPosition - u_cameraPos);
    Intersection i = RayIntersectEllipsoid(u_cameraPos, u_cameraPosSquared, rayDirection, u_globeOneOverRadiiSquared);

    if (i.Intersects)
    {
        vec3 position = u_cameraPos + (i.NearTime * rayDirection);
        vec3 normal = GeodeticSurfaceNormal(position, u_globeOneOverRadiiSquared);

        vec3 toLight = normalize(u_pointLightPosition - position);
        vec3 toEye = normalize(u_cameraPos - position);
        float intensity = LightIntensity(normal, toLight, toEye, u_diffuseSpecularAmbientShininess);

        gl_FragColor = vec4(intensity * texture2D(u_sampler, ComputeTextureCoordinates(normal)).rgb, 1.0);
    }
    else
    {
        discard;
    }
}