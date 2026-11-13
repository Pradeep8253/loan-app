/**
 * Stepper — labelled progress for multi-step flows. Presentational + accessible.
 */
import "./Stepper.css";

export default function Stepper({ steps, current, label = "Application progress" }) {
  return (
    <div className="stepper">
      <div className="stepper__meta">
        <p className="stepper__label">{label}</p>
        <p className="stepper__count">Step {current + 1} of {steps.length}</p>
      </div>
      <ol className="stepper__track" aria-label={label}>
        {steps.map((step, i) => {
          const state = i < current ? "done" : i === current ? "current" : "todo";
          return (
            <li key={step} className={`stepper__step stepper__step--${state}`} aria-current={state === "current" ? "step" : undefined}>
              <span className="stepper__bar" />
              <span className="stepper__name">{step}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
