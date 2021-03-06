var createErlCoreEffectfulFunction, displayEffectsOnErlValues, getEnvironment, serialize, setCoreEffectfulFnsOnErlValues_bang_, toArray, _prStr,
  __hasProp = {}.hasOwnProperty;

createErlCoreEffectfulFunction = require('./type-utilities').createErlCoreEffectfulFunction;

serialize = require('./serialize');

toArray = require('./linked-list').toArray;

getEnvironment = function(config) {
  var display, environment;
  display = config.display, environment = config.environment;
  setCoreEffectfulFnsOnErlValues_bang_(display)(environment, displayEffectsOnErlValues);
  return environment;
};

_prStr = function(erlArgs, printReadably_question_) {
  return ((toArray(erlArgs)).map(function(erlArg) {
    return serialize(erlArg, printReadably_question_);
  })).join('');
};

setCoreEffectfulFnsOnErlValues_bang_ = function(represent) {
  return function(env, fns) {
    var fn, fnName, _results;
    _results = [];
    for (fnName in fns) {
      if (!__hasProp.call(fns, fnName)) continue;
      fn = fns[fnName];
      _results.push(env[fnName] = createErlCoreEffectfulFunction(function(erlArgs) {
        return represent(fn(erlArgs));
      }));
    }
    return _results;
  };
};

displayEffectsOnErlValues = {
  'print': function(erlArgs) {
    return _prStr(erlArgs, false);
  },
  'pretty-print': function(erlArgs) {
    return _prStr(erlArgs, true);
  }
};

module.exports = getEnvironment;
