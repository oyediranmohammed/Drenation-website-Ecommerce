import statesWithLgas from "../data/statesWithLgas.js";

// GET /api/states
export const getAllStates = (req, res) => {
  res.json(statesWithLgas );
};

// GET /api/states/lgas?state=Lagos
export const getLgasByState = (req, res) => {
  const { state } = req.query;

  if (!state) {
    return res.status(400).json({ error: "State query parameter is required." });
  }

  const normalizedState = Object.keys(statesWithLgas).find(
    (key) => key.toLowerCase() === state.toLowerCase()
  );

  if (!normalizedState) {
    return res.status(404).json({ error: `State '${state}' not found.` });
  }

  const lgas = statesWithLgas[normalizedState];
  res.json( lgas );
};
