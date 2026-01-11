import prisma from "../prisma.js";

/* ================= CREATE FORM ================= */
export const createForm = async (req, res) => {
  try {
    const {
      title,
      description,
      theme,
      questions,
      isTemplate = false,
    } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({
        message: "Title and at least one question are required",
      });
    }

    const form = await prisma.form.create({
      data: {
        title,
        description,
        theme,
        questions,
        isTemplate, // ✅ IMPORTANT
        userId: req.user.userId,
      },
    });

    res.status(201).json(form);
  } catch (err) {
    console.error("Create Form Error:", err);
    res.status(500).json({ message: "Failed to create form" });
  }
};

/* ================= USER FORMS ================= */
export const getMyForms = async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: "desc" },
    });

    res.json(forms);
  } catch (err) {
    console.error("Get My Forms Error:", err);
    res.status(500).json({ message: "Failed to fetch forms" });
  }
};

/* ================= GET FORM BY ID ================= */
export const getFormById = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await prisma.form.findUnique({
      where: { id },
    });

    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }

    res.json(form);
  } catch (err) {
    console.error("Get Form By ID Error:", err);
    res.status(500).json({ message: "Failed to fetch form" });
  }
};

/* ================= TEMPLATES ================= */
export const getTemplates = async (_req, res) => {
  try {
    const templates = await prisma.form.findMany({
      where: { isTemplate: true },
      orderBy: { createdAt: "desc" },
    });

    res.json(templates);
  } catch (err) {
    console.error("Get Templates Error:", err);
    res.status(500).json({ message: "Failed to fetch templates" });
  }
};
