import { __esmMin } from "./rolldown-runtime-DXoylpqc.js";
import { AnalysisInputError, init_analysisErrorCore, init_inputArgumentGuidance, init_isRecord, isRecord, knownArgumentMistakeGuidance, knownViewMistakeGuidance } from "./jsonSerialization-DAF9DVXC.js";

//#region dist/domain/inputIssueProjection.js
var isRootArgument, analysisInputErrorFromIssues, analysisOperationInputErrorFromIssues, projectInputIssues, projectionBudgetExceeded, projectInputIssuesBounded, projectInputIssueGroupsWithinBudget, chargeUnionProjection, chargeProjection, nestedIssue, projectUnrecognizedKeyIssues, CANDIDATE_DISCRIMINATOR_KEYS, candidateDiscriminatorKeys, branchAcceptsKey, branchHasNonValueKeyIssue, branchHasDirectKeyIssue, extractIssueExpectedValues, collectKeyExpectedValues, chargeExpectedValuesBudget, resolveUnionDiscriminatorDiagnostic, narrowUnionBranches, projectUnionIssue, projectIssue, mergeExpectedValues, uniqueIssues, valueAtPath, numericBound, isSafeExpected, safeExpected, boundedIssue;
function init_inputIssueProjection() {
	return (init_inputIssueProjection = __esmMin((() => {
		init_analysisErrorCore();
		init_inputArgumentGuidance();
		isRootArgument = (path) => path.length === 0 || path.length === 1 && path[0] === "input";
		analysisInputErrorFromIssues = (operation, issues, input, options = {}) => new AnalysisInputError(operation, {
			...options.cause === undefined ? {} : { cause: options.cause },
			...options.userMessage === undefined ? {} : { userMessage: options.userMessage }
		}, [...projectInputIssues(issues, input, operation), ...options.additionalIssues ?? []]);
		analysisOperationInputErrorFromIssues = (operation, issues, input, cause) => new AnalysisInputError(operation, { cause }, projectInputIssues(issues, {
			operation,
			input
		}, operation).map((issue) => issue.path[0] === "input" ? {
			...issue,
			path: issue.path.slice(1)
		} : issue));
		projectInputIssues = (issues, input, operation) => issues.flatMap((issue) => projectIssue(issue, input, undefined, operation));
		projectionBudgetExceeded = Symbol("input issue projection budget exceeded");
		projectInputIssuesBounded = (issues, input, budgetBytes) => {
			const budget = { remaining: budgetBytes };
			const output = [];
			let index = 0;
			try {
				for (; index < issues.length; index += 1) {
					const issue = issues[index];
					if (issue === undefined) continue;
					output.push(...projectIssue(issue, input, budget));
				}
			} catch (error) {
				if (error !== projectionBudgetExceeded) throw error;
				const omittedIssueCount = issues.length - index;
				if (output.length > 0) return {
					issues: output,
					omittedIssueCount
				};
				const first = issues[0];
				if (first === undefined) return {
					issues: output,
					omittedIssueCount
				};
				const path = first.path.flatMap((part) => typeof part === "string" || typeof part === "number" ? [part] : []);
				return {
					issues: [{
						path,
						reason: "invalid_value",
						message: `${String(omittedIssueCount)} field diagnostics at this location were omitted because they do not fit the response budget.`
					}],
					omittedIssueCount
				};
			}
			return {
				issues: output,
				omittedIssueCount: 0
			};
		};
		projectInputIssueGroupsWithinBudget = (issues, input, budgetBytes, operation) => {
			const budget = { remaining: budgetBytes };
			try {
				const groups = [];
				for (const issue of issues) groups.push(projectIssue(issue, input, budget, operation));
				return groups;
			} catch (error) {
				if (error === projectionBudgetExceeded) return undefined;
				throw error;
			}
		};
		chargeUnionProjection = (issue, charge) => {
			for (const branch of issue.errors) charge(32 + 32 * branch.length);
			if ("options" in issue && Array.isArray(issue.options)) for (const value of issue.options) charge(typeof value === "string" ? 6 * value.length + 32 : 32);
			if ("discriminator" in issue && typeof issue.discriminator === "string") charge(6 * issue.discriminator.length + 16);
		};
		chargeProjection = (issue, budget, operation, input) => {
			const charge = (amount) => {
				budget.remaining -= amount;
				if (budget.remaining < 0) throw projectionBudgetExceeded;
			};
			charge(256);
			let pathCost = 0;
			for (const part of issue.path) {
				const cost = typeof part === "string" ? 6 * part.length + 16 : 32;
				pathCost += cost;
				charge(cost);
			}
			charge(6 * issue.message.length);
			const viewGuidance = knownViewMistakeGuidance(operation, input, issue.path.flatMap((part) => typeof part === "string" || typeof part === "number" ? [part] : []));
			if (viewGuidance !== undefined) charge(6 * viewGuidance.message.length);
			if (issue.code === "invalid_union") chargeUnionProjection(issue, charge);
			if (issue.code === "invalid_key") charge(32 * issue.issues.length);
			if (issue.code === "unrecognized_keys") for (const key of issue.keys) {
				charge(256 + pathCost + 6 * key.length);
				if (isRootArgument(issue.path)) {
					const guidance = knownArgumentMistakeGuidance(operation, key);
					const expectedAlreadyPresent = guidance !== undefined && valueAtPath(input, [...issue.path, guidance.expected]) !== undefined;
					if (guidance !== undefined && !expectedAlreadyPresent) charge(6 * guidance.expected.length + 6 * guidance.message.length + 32);
				}
			}
			if (issue.code === "invalid_value") for (const value of issue.values) charge(typeof value === "string" ? 6 * value.length + 32 : 32);
		};
		nestedIssue = (parent, child, budget) => {
			if (budget !== undefined) {
				budget.remaining -= 32 + 8 * (parent.path.length + child.path.length);
				if (budget.remaining < 0) throw projectionBudgetExceeded;
			}
			return {
				...child,
				path: [...parent.path, ...child.path]
			};
		};
		projectUnrecognizedKeyIssues = (keys, path, input, operation) => keys.map((key) => {
			const guidance = isRootArgument(path) ? knownArgumentMistakeGuidance(operation, key) : undefined;
			const expectedAlreadyPresent = guidance !== undefined && valueAtPath(input, [...path, guidance.expected]) !== undefined;
			const effectiveGuidance = expectedAlreadyPresent ? undefined : guidance;
			return {
				path: [...path, key],
				reason: "unknown_argument",
				...effectiveGuidance === undefined ? {} : {
					expected: effectiveGuidance.expected,
					message: effectiveGuidance.message
				}
			};
		});
		CANDIDATE_DISCRIMINATOR_KEYS = [
			"kind",
			"type",
			"setting",
			"collection",
			"projection",
			"facet",
			"format",
			"source",
			"action",
			"mode"
		];
		candidateDiscriminatorKeys = (targetValue, budget) => {
			const targetRecord = targetValue;
			const keys = [];
			for (const k of CANDIDATE_DISCRIMINATOR_KEYS) {
				if (Object.hasOwn(targetRecord, k)) {
					if (budget !== undefined) {
						budget.remaining -= 32;
						if (budget.remaining < 0) throw projectionBudgetExceeded;
					}
					keys.push(k);
				}
			}
			let otherKeys = 0;
			for (const key in targetRecord) {
				if (!Object.hasOwn(targetRecord, key)) continue;
				if (CANDIDATE_DISCRIMINATOR_KEYS.includes(key)) continue;
				if (otherKeys >= 32) break;
				if (budget !== undefined) {
					budget.remaining -= 32;
					if (budget.remaining < 0) throw projectionBudgetExceeded;
				}
				keys.push(key);
				otherKeys++;
			}
			return keys;
		};
		branchAcceptsKey = (branchErrors, key, budget) => {
			if (budget !== undefined) {
				budget.remaining -= 16;
				if (budget.remaining < 0) throw projectionBudgetExceeded;
			}
			for (const err of branchErrors) {
				if (err.path.length === 1 && err.path[0] === key) return false;
				if (err.code === "unrecognized_keys" && err.path.length === 0) {
					for (const rejectedKey of err.keys) {
						if (budget !== undefined) {
							budget.remaining -= 4;
							if (budget.remaining < 0) throw projectionBudgetExceeded;
						}
						if (rejectedKey === key) return false;
					}
				}
				if (err.code === "invalid_union" && err.path.length === 0) {
					const anyNestedAccepts = err.errors.some((nested) => branchAcceptsKey(nested, key, budget));
					if (!anyNestedAccepts) return false;
				}
			}
			return true;
		};
		branchHasNonValueKeyIssue = (branchErrors, key, budget) => {
			if (budget !== undefined) {
				budget.remaining -= 16;
				if (budget.remaining < 0) throw projectionBudgetExceeded;
			}
			for (const err of branchErrors) {
				if (err.path.length === 1 && err.path[0] === key && err.code !== "invalid_value") {
					return true;
				}
				if (err.code === "invalid_union" && err.path.length === 0) {
					const anyNested = err.errors.some((nested) => branchHasNonValueKeyIssue(nested, key, budget));
					if (anyNested) return true;
				}
			}
			return false;
		};
		branchHasDirectKeyIssue = (branchErrors, key, code, budget) => {
			if (budget !== undefined) {
				budget.remaining -= 16;
				if (budget.remaining < 0) throw projectionBudgetExceeded;
			}
			for (const err of branchErrors) {
				if (err.path.length === 1 && err.path[0] === key && err.code === code) {
					return true;
				}
				if (err.code === "invalid_union" && err.path.length === 0) {
					const anyNested = err.errors.some((nested) => branchHasDirectKeyIssue(nested, key, code, budget));
					if (anyNested) return true;
				}
			}
			return false;
		};
		extractIssueExpectedValues = (issue) => {
			if (issue.code === "invalid_value") {
				if ("values" in issue && Array.isArray(issue.values)) return issue.values;
				if ("options" in issue && Array.isArray(issue.options)) return issue.options;
				if ("expected" in issue && issue.expected !== undefined) return [issue.expected];
			}
			return [];
		};
		collectKeyExpectedValues = (branchErrors, key, budget) => {
			if (budget !== undefined) {
				budget.remaining -= 16;
				if (budget.remaining < 0) throw projectionBudgetExceeded;
			}
			const result = [];
			for (const err of branchErrors) {
				if (err.path.length === 1 && err.path[0] === key) {
					const expected = extractIssueExpectedValues(err);
					if (budget !== undefined && expected.length > 0) {
						budget.remaining -= 16 * expected.length;
						if (budget.remaining < 0) throw projectionBudgetExceeded;
					}
					result.push(...expected);
				} else if (err.code === "invalid_union" && err.path.length === 0) {
					for (const nested of err.errors) {
						result.push(...collectKeyExpectedValues(nested, key, budget));
					}
				}
			}
			return result;
		};
		chargeExpectedValuesBudget = (path, uniqueExpected, budget) => {
			if (budget === undefined) return;
			budget.remaining -= 32 + 8 * (path.length + 1);
			for (const item of uniqueExpected) {
				budget.remaining -= typeof item === "string" ? 6 * item.length + 32 : 32;
			}
			if (budget.remaining < 0) throw projectionBudgetExceeded;
		};
		resolveUnionDiscriminatorDiagnostic = (currentErrors, path, candidateKeys, budget) => {
			for (const key of candidateKeys) {
				if (!CANDIDATE_DISCRIMINATOR_KEYS.includes(key)) {
					continue;
				}
				const allBranchesReject = currentErrors.every((branch) => !branchAcceptsKey(branch, key, budget));
				if (!allBranchesReject) continue;
				const anyBranchHasNonValue = currentErrors.some((branch) => branchHasNonValueKeyIssue(branch, key, budget));
				if (anyBranchHasNonValue) return "preserve";
				const anyBranchHasInvalidValue = currentErrors.some((branch) => branchHasDirectKeyIssue(branch, key, "invalid_value", budget));
				if (!anyBranchHasInvalidValue) continue;
				const allExpected = currentErrors.flatMap((branch) => collectKeyExpectedValues(branch, key, budget));
				const uniqueExpected = [...new Set(allExpected.filter(isSafeExpected))];
				if (uniqueExpected.length === 0) continue;
				chargeExpectedValuesBudget(path, uniqueExpected, budget);
				return [{
					path: [...path, key],
					reason: "invalid_value",
					expected: uniqueExpected
				}];
			}
			return undefined;
		};
		narrowUnionBranches = (errors, targetValue, budget, keysToCheck) => {
			let currentErrors = errors;
			const candidateKeys = keysToCheck ?? candidateDiscriminatorKeys(targetValue, budget);
			for (const key of candidateKeys) {
				const matchingBranches = currentErrors.filter((branch) => branchAcceptsKey(branch, key, budget));
				if (matchingBranches.length === 0 && currentErrors.some((branch) => branchHasNonValueKeyIssue(branch, key, budget))) break;
				if (matchingBranches.length > 0 && matchingBranches.length < currentErrors.length) {
					currentErrors = matchingBranches;
					if (currentErrors.length === 1) break;
				}
			}
			return currentErrors;
		};
		projectUnionIssue = (issue, path, context) => {
			const { input, projectChildIssue, budget } = context;
			if (issue.errors.length === 0) {
				const targetPath = "discriminator" in issue && typeof issue.discriminator === "string" && path.at(-1) !== issue.discriminator ? [...path, issue.discriminator] : path;
				const expected = "options" in issue && Array.isArray(issue.options) ? issue.options.filter(isSafeExpected) : undefined;
				return [{
					path: targetPath,
					reason: valueAtPath(input, targetPath) === undefined ? "missing_argument" : "invalid_value",
					...expected === undefined ? {} : { expected }
				}];
			}
			const targetValue = valueAtPath(input, path);
			let activeErrors = issue.errors;
			if (isRecord(targetValue)) {
				const candidateKeys = candidateDiscriminatorKeys(targetValue, budget);
				let narrowed = narrowUnionBranches(issue.errors, targetValue, budget, candidateKeys.filter((key) => CANDIDATE_DISCRIMINATOR_KEYS.includes(key)));
				if (narrowed.length > 1) {
					const discriminator = resolveUnionDiscriminatorDiagnostic(narrowed, path, candidateKeys, budget);
					if (discriminator !== undefined && discriminator !== "preserve") return discriminator;
					if (discriminator !== "preserve") {
						const payloadNarrowed = narrowUnionBranches(narrowed, targetValue, budget, candidateKeys);
						if (payloadNarrowed.length > 1 && payloadNarrowed.length < narrowed.length) {
							const secondary = resolveUnionDiscriminatorDiagnostic(payloadNarrowed, path, candidateKeys, budget);
							if (secondary !== undefined && secondary !== "preserve") return secondary;
						}
						narrowed = payloadNarrowed;
					}
				}
				activeErrors = narrowed;
			}
			return uniqueIssues(activeErrors.flatMap((branch) => branch.flatMap((branchIssue) => projectChildIssue(nestedIssue(issue, branchIssue, budget)))));
		};
		projectIssue = (issue, input, budget, operation) => {
			if (budget !== undefined) chargeProjection(issue, budget, operation, input);
			const path = issue.path.flatMap((part) => typeof part === "string" || typeof part === "number" ? [part] : []);
			const viewGuidance = knownViewMistakeGuidance(operation, input, path);
			if (issue.code === "invalid_union") {
				return projectUnionIssue(issue, path, {
					input,
					projectChildIssue: (child) => projectIssue(child, input, budget, operation),
					budget
				});
			}
			if (issue.code === "invalid_key") return issue.issues.flatMap((keyIssue) => projectIssue(nestedIssue(issue, keyIssue, budget), input, budget, operation));
			if (issue.code === "unrecognized_keys") return projectUnrecognizedKeyIssues(issue.keys, path, input, operation);
			if (issue.code === "invalid_type") return [{
				path,
				reason: valueAtPath(input, path) === undefined ? "missing_argument" : "invalid_type",
				expected: safeExpected(issue.expected),
				...viewGuidance !== undefined ? { message: viewGuidance.message } : {}
			}];
			if (issue.code === "too_small") return [boundedIssue(path, "minimum", numericBound(issue.minimum), issue)];
			if (issue.code === "too_big") return [boundedIssue(path, "maximum", numericBound(issue.maximum), issue)];
			if (issue.code === "invalid_format") return [{
				path,
				reason: "invalid_format",
				expected: issue.format,
				...issue.format === "regex" && issue.message.length > 0 ? { message: issue.message } : {}
			}];
			if (issue.code === "invalid_value") return [{
				path,
				reason: "invalid_value",
				expected: issue.values.filter(isSafeExpected),
				...viewGuidance !== undefined ? { message: viewGuidance.message } : {}
			}];
			return [{
				path,
				reason: "invalid_value",
				...viewGuidance !== undefined ? { message: viewGuidance.message } : issue.message.length > 0 ? { message: issue.message } : {}
			}];
		};
		mergeExpectedValues = (first, second) => [...new Set([...Array.isArray(first) ? first : [first], ...Array.isArray(second) ? second : [second]].filter(isSafeExpected))];
		uniqueIssues = (issues) => {
			const merged = [];
			const invalidValueIndexByPath = new Map();
			const seenSerializedKeys = new Set();
			for (const issue of issues) {
				const pathKey = JSON.stringify(issue.path);
				if (issue.reason === "invalid_value" && issue.expected !== undefined) {
					const existingIndex = invalidValueIndexByPath.get(pathKey);
					if (existingIndex !== undefined) {
						const existing = merged[existingIndex];
						if (existing !== undefined) {
							merged[existingIndex] = {
								...existing,
								expected: mergeExpectedValues(existing.expected, issue.expected),
								...existing.message ?? issue.message ? { message: existing.message ?? issue.message } : {}
							};
							continue;
						}
					}
					invalidValueIndexByPath.set(pathKey, merged.length);
				}
				const fullKey = JSON.stringify(issue);
				if (!seenSerializedKeys.has(fullKey)) {
					seenSerializedKeys.add(fullKey);
					merged.push(issue);
				}
			}
			return merged;
		};
		valueAtPath = (input, path) => {
			let current = input;
			for (const part of path) {
				if (typeof current !== "object" || current === null) return undefined;
				const next = Reflect.get(current, part);
				current = next;
			}
			return current;
		};
		numericBound = (value) => typeof value === "number" && Number.isFinite(value) ? value : undefined;
		isSafeExpected = (value) => value === null || [
			"string",
			"number",
			"boolean"
		].includes(typeof value);
		safeExpected = (value) => isSafeExpected(value) ? value : "schema-defined value";
		boundedIssue = (path, key, value, issue) => ({
			path,
			reason: "out_of_range",
			...value === undefined ? {} : issue.inclusive === false ? { message: issue.message } : { [key]: value }
		});
	})))();
}

//#endregion
export { analysisInputErrorFromIssues, analysisOperationInputErrorFromIssues, init_inputIssueProjection, projectInputIssues, projectInputIssuesBounded };