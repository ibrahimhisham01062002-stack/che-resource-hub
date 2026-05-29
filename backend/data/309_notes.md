# ChE 309: Particle Technology & Unit Operations

## 1. Particle Size Characterization
- **Sphericity** ($\phi_s$): Measure of how closely a particle resembles a sphere:

  $$\phi_s = \frac{6 / D_p}{s_p / v_p} = \frac{6 v_p}{D_p s_p}$$

  For a perfect sphere, $\phi_s = 1$.
- **Mean Diameter**: Sauter Mean Diameter ($D_{32}$) represents volume-to-surface area average:

  $$D_{32} = \frac{1}{\sum (x_i / D_{pi})}$$

## 2. Flow Through Packed Beds (Ergun Equation)
To estimate the pressure drop ($\Delta P$) across a packed column of height $L$ and voidage $\epsilon$:

$$\frac{\Delta P}{L} = \frac{150 \mu u_0 (1-\epsilon)^2}{\phi_s^2 D_p^2 \epsilon^3} + \frac{1.75 \rho u_0^2 (1-\epsilon)}{\phi_s D_p \epsilon^3}$$

Where:
- First term: Viscous energy loss (Blake-Kozeny equation, laminar flow)
- Second term: Inertial energy loss (Burke-Plummer equation, turbulent flow)
- $u_0$ is the superficial fluid velocity

## 3. Fluidization Mechanics
At minimum fluidization velocity ($u_{mf}$), the drag force of upward flowing fluid equals the buoyant weight of solids:

$$\Delta P = L (1-\epsilon) (\rho_p - \rho) g$$

## 4. Cake Filtration Theory
The filtration fundamental equation relates filtrate volume ($V$) to filtration time ($t$):

$$\frac{dt}{dV} = K_c V + \frac{1}{q_0}$$

Integrating under constant pressure drop gives:

$$t = \frac{K_c}{2} V^2 + \frac{V}{q_0}$$