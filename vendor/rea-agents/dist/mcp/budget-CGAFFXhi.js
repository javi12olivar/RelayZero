import { t as __esmMin } from "./rolldown-runtime-BjeaiXFo.js";
import { a as invariantViolation, i as init_internalInvariant } from "./errorMessage-rfGn5D1_.js";

//#region dist/domain/budget.js
var isAmount, Budget;
function init_budget() {
	return (init_budget = __esmMin((() => {
		init_internalInvariant();
		isAmount = (value) => Number.isSafeInteger(value) && value >= 0;
		Budget = class {
			maximum;
			#used = 0;
			constructor(maximum) {
				this.maximum = maximum;
				if (!isAmount(maximum)) throw invariantViolation(`Budget maximum must be a non-negative safe integer, got ${String(maximum)}`);
			}
			/** Amount charged and not refunded. */
			get used() {
				return this.#used;
			}
			/** Amount still available; zero while over-committed. */
			get remaining() {
				return Math.max(0, this.maximum - this.#used);
			}
			/** Amount charged past the maximum by `chargeOverCommitting`. */
			get overCommitted() {
				return Math.max(0, this.#used - this.maximum);
			}
			/** Charge `amount` when it fits; otherwise charge nothing and return false. */
			tryCharge(amount) {
				if (!isAmount(amount) || amount > this.remaining) return false;
				this.#used += amount;
				return true;
			}
			/** Charge `amount`, or throw the owner's limit failure without charging. */
			charge(amount, exhausted) {
				if (!this.tryCharge(amount)) throw exhausted();
			}
			/**
			* Charge `amount` whether or not it fits, for an owner that reports the
			* excess itself rather than refusing it. Returns the shortfall: the part of
			* `amount` beyond what remained, zero when it fit.
			*/
			chargeOverCommitting(amount) {
				if (!isAmount(amount)) throw invariantViolation(`Budget charge must be a non-negative safe integer, got ${String(amount)}`);
				const shortfall = Math.max(0, amount - this.remaining);
				this.#used += amount;
				return shortfall;
			}
			/**
			* Charge `amount` into a cache, evicting entries until it fits. `evict`
			* discards the oldest entry and returns its charged amount, or `undefined`
			* when nothing is left to evict. An amount above the maximum evicts nothing
			* and returns false.
			*/
			chargeEvicting(amount, evict) {
				if (!isAmount(amount) || amount > this.maximum) return false;
				while (amount > this.remaining) {
					const freed = evict();
					if (freed === undefined) return false;
					this.refund(freed);
				}
				return this.tryCharge(amount);
			}
			/**
			* Refund everything charged since `mark`, a value of `used` taken earlier,
			* and return the refunded amount. A mark at or above the current use refunds
			* nothing: restoring never re-charges, because a re-charge could fail.
			*/
			restore(mark) {
				const released = Math.max(0, this.#used - mark);
				this.refund(released);
				return released;
			}
			/** Return a reservation that was not retained. */
			refund(amount) {
				if (!isAmount(amount)) throw invariantViolation(`Budget refund must be a non-negative safe integer, got ${String(amount)}`);
				this.#used = Math.max(0, this.#used - amount);
			}
		};
	})))();
}

//#endregion
export { init_budget as n, Budget as t };