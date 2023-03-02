// scopes starts with the root scope and ends with the token scope
export function getBestMatchRule(theme: any, scopes: string[]) {
  const { tokenColors: rules } = theme || [];

  let bestScore = 0;
  let bestRule = null;
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    const score = scopesMatchesRule(scopes, rule);
    if (score > bestScore) {
      bestScore = score;
      bestRule = rule;
      // console.log({ rule, score, scopes: scopesDescending });
    }
  }
  return bestRule;
}

function scopesMatchesRule(scopes, rule) {
  const selectors =
    typeof rule.scope === "string"
      ? rule.scope.split(/,/).map((scope) => scope.trim())
      : Array.isArray(rule.scope)
      ? rule.scope
      : [];
  if (selectors.length === 0) {
    return 0;
  }

  const scores = selectors.map((selector) =>
    scopesMatchesSelector(scopes, selector)
  );
  return Math.max(...scores);
}

// example:
// scopes: ["source.js", "meta.function.js", "variable.parameter.js"]
// selector: "meta.function variable"
function scopesMatchesSelector(scopes, selector) {
  const subSelectors = selector.split(/ /); // ["meta.function", "variable"]
  const scores = scopes.map((scope) => 0);
  let scopeDepth = 0;

  // TODO handle Excluding Elements "source.ruby string - string source"
  // https://macromates.com/manual/en/scope_selectors

  for (let i = 0; i < subSelectors.length; i++) {
    const subSelector = subSelectors[i];

    let score = 0;
    for (
      let scopeIndex = scopeDepth;
      scopeIndex < scopes.length;
      scopeIndex++
    ) {
      const scope = scopes[scopeIndex];
      const scopeScore = scopeMatchesSubSelector(scope, subSelector);
      if (scopeScore > 0) {
        score = scopeScore;
        scopeDepth = scopeIndex + 1;
        scores[scopeIndex] = score;
        break;
      }
    }

    if (score === 0) {
      return 0;
    }
  }

  let score = 0;
  for (let i = 0; i < scores.length; i++) {
    score += scores[i] * Math.pow(10, i);
  }
  return score;
}
// example:
// scopes: "meta.function.js"
// selector: "meta.function"
// returns 2
// scopes: "meta.function.js"
// selector: "meta"
// returns 1
function scopeMatchesSubSelector(scope, selector) {
  const selectorPrefix = selector + ".";
  if (selector === scope || scope.startsWith(selectorPrefix)) {
    return selector.split(".").length;
  }
  return 0;
}
