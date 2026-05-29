# ChE 401: Chemical Reaction Engineering - Core Formulas & Cheatsheet

## 1. Rate Laws and Reaction Order
For a general reaction:  
$$aA + bB \rightarrow cC + dD$$

The rate of disappearance of reactant $A$, $-r_A$, is expressed as:
$$-r_A = k C_A^\alpha C_B^\beta$$
Where:
- $k$ is the reaction rate constant: $k = A e^{-E_a / R T}$ (Arrhenius Equation)
- $C_A, C_B$ are concentrations of species $A$ and $B$
- $\alpha, \beta$ are the reaction orders with respect to $A$ and $B$

## 2. Design Equations for Ideal Reactors

| Reactor Type | Differential Form | Algebraic / Integral Form | Space Time ($\tau$) |
| :--- | :--- | :--- | :--- |
| **Batch** | $N_A \frac{dX}{dt} = -r_A V$ | $t = N_{A0} \int_0^X \frac{dX}{-r_A V}$ | N/A |
| **CSTR** | N/A | $V = \frac{F_{A0} X}{-r_A}$ | $\tau = \frac{V}{v_0} = \frac{C_{A0} X}{-r_A}$ |
| **PFR** | $F_{A0} \frac{dX}{dV} = -r_A$ | $V = F_{A0} \int_0^X \frac{dX}{-r_A}$ | $\tau = C_{A0} \int_0^X \frac{dX}{-r_A}$ |
| **PBR (Packed Bed)**| $F_{A0} \frac{dX}{dW} = -r_A'$ | $W = F_{A0} \int_0^X \frac{dX}{-r_A'}$ | N/A |

## 3. Multiple Reactions
- **Selectivity** ($S_{D/U}$): Ratio of flow rate of desired product $D$ to undesired product $U$:  
  $$S_{D/U} = \frac{F_D}{F_U} = \frac{r_D}{r_U}$$
- **Yield** ($Y_D$): Ratio of moles of product $D$ formed to moles of key reactant consumed:  
  $$Y_D = \frac{F_D}{F_{A0} - F_A}$$

## 4. Temperature Effects (Non-isothermal)
Energy balance for a steady-state CSTR:
$$\sum F_i C_{Pi} (T - T_0) + [\Delta H_{Rx}(T)] F_{A0} X = Q - W_s$$