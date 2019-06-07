export function createNetworkConstants(namespace) {
  return {
    REQUEST: `${namespace}.REQUEST`,
    RECEIVE: `${namespace}.RECEIVE`,
    ERROR: `${namespace}.ERROR`
  };
}

export function createModelConstants(namespace, others = []) {
  const constants = {
    FETCH: createNetworkConstants(`${namespace}.FETCH`),
    CREATE: createNetworkConstants(`${namespace}.CREATE`),
    UPDATE: createNetworkConstants(`${namespace}.UPDATE`),
    DELETE: createNetworkConstants(`${namespace}.DELETE`)
  };
  others.forEach(
    k => (constants[k] = createNetworkConstants(`${namespace}.${k}`))
  );
  return constants;
}
