# ChE 312: Process Simulation Lab (HYSYS) - Cheatsheet

## 1. Thermodynamic Fluid Package Selection
Selecting the correct fluid package is the single most critical step in process flowsheeting:
- **Peng-Robinson (PR)**: Excellent for oil, gas, and petrochemical applications. Handles hydrocarbon mixtures, light gases, and high-pressure setups.
- **SRK (Soave-Redlich-Kwong)**: Similar to PR, widely used in gas processing plants.
- **NRTL / UNIQUAC**: Crucial for highly non-ideal chemical mixtures (polar systems, low pressures, azeotropic systems like ethanol-water distillation).
- **Steam Tables (ASME)**: Best for water/steam cycles and power plants.

## 2. Recycle Loop Convergence
Recycle loops require iterative solutions. To converge successfully:
- Place a **Recycle block** immediately before the inlet node where recycling occurs.
- Initialize loop variables with logical guess values.
- Adjust convergence sensitivities (tolerance) and damping factors in the recycle parameters.

## 3. Shortcut Distillation Design
The Shortcut Distillation block uses the **Fenske-Underwood-Gilliland (FUG)** equations:
- **Fenske**: Calculates the minimum number of equilibrium stages ($N_{min}$):
  $$N_{min} = \frac{\ln[\frac{x_{LK,D}}{x_{HK,D}} \times \frac{x_{HK,B}}{x_{LK,B}}]}{\ln \alpha_{avg}}$$
- **Underwood**: Calculates the minimum reflux ratio ($R_{min}$).
- **Gilliland**: Computes the actual stages ($N$) for a given operating reflux ratio ($R$).