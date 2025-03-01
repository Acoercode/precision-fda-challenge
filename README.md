# Acoer  | FDA Cosmetics Guidances AI Companion

GitHub Link: https://github.com/Acoercode/precision-fda-challenge

To run frontend for AI interface chat (will be live in localhost:3000) :

```
cd frontend
npm i
npm run generate
npm run dev

Add .env file
- Add OPENAI_API_KEY
- # The system prompt for the AI model.
SYSTEM_PROMPT="You are an expert AI assistant participating in the PrecisionFDA Generative AI Community Challenge. Your goal is to leverage Generative AI techniques to analyze the FDA Cosmetic Guidance document, extract meaningful insights, and provide clear, accurate responses to regulatory questions. You have access to state-of-the-art language models and regulatory frameworks.

              Your task involves the following:
              	•	Understanding the FDA Cosmetic Guidance Document: Extract and summarize key regulatory requirements relevant to cosmetic products.
              	•	Precision in Responses: Ensure that all outputs align with FDA’s mission, maintaining accuracy, clarity, and regulatory compliance.
              	•	Bias Awareness & Ethical AI: Avoid generating biased or misleading interpretations of regulatory content.
              	•	Handling Public Health Data: Maintain compliance with privacy and security best practices when processing public health information.

              Now, given a specific question about FDA cosmetic regulations, analyze the provided guidance document and generate a precise, well-structured response. If applicable, include citations or references from the document to support your answer."
```
To run backend (will be live in localhost:8000) :
```
cd backend
initiate venv
pip3 install -r requirements.txt
python3 server.py

Add .env file
- Add OPENAI_API_KEY
```

***Some functionality will not be available until demo is published with permission.***

test_question.csv found within this repository to view questions and answers.


## Technical Analysis of the AI-Powered Chat & Auditing System for the Precision FDA Challenge

This project is a retrieval-augmented generation (RAG) system that integrates an AI-powered chat interface with event tracking, auditing mechanisms, and blockchain-based traceability. Designed to ensure response accuracy, transparency, and regulatory compliance, it utilizes a Next.js frontend, FastAPI backend, AI-driven context retrieval, and Hedera Hashgraph for immutable auditing. Below, we analyze its approach, methodology, performance, challenges, and future directions.
## Approach and Methodology

The system is structured around three core components:
1. AI-Driven Chat System – Enables real-time interaction with a generative AI model.
2. Auditing and Traceability Layer – Logs AI responses, tracks tool invocations, and visualizes AI decisions.
3. FastAPI Backend – Serves as the bridge between the frontend and AI model, handling retrieval, validation, and event-based logging.
4. Blockchain-Based Auditing (Hedera Hashgraph) – Each AI-generated response and its corresponding query are hashed and timestamped on the Hedera blockchain for tamper-proof traceability.

Techniques Used in the RAG System
- Retrieval-Augmented Generation (RAG): The AI dynamically pulls context from external sources before generating responses.
- Event-Driven Auditing: AI decisions are logged at each stage to ensure transparency.
- Blockchain-Backed Response Validation: Each question-response pair is hashed and recorded on Hedera Hashgraph, providing an immutable audit trail.
- Completeness Detection: Responses are classified as “complete” or “incomplete” based on content heuristics.
- Tool-Assisted AI Execution: AI leverages external tools for additional processing and validation.

Fine-Tuning & Rationale
- No direct fine-tuning is used. Instead, the system enhances pre-trained models through context retrieval and tool-assisted execution.
- Rationale: Fine-tuning large models is resource-intensive and static, whereas RAG enables dynamic knowledge updates and improves factual accuracy.

## Performance Evaluation: Accuracy & Relevance

The system is optimized for high-precision AI-driven responses. Its accuracy depends on:
1. Contextual Retrieval Quality – The system must retrieve relevant and diverse information.
2. Response Validation – AI-generated answers must be factually correct and complete.
3. Ground Truth Comparison – Outputs are benchmarked against FDA-compliant healthcare data.

Performance Metrics
- Precision & Recall: Evaluates how well the RAG system retrieves relevant documents.
- Response Completeness: AI responses are assessed using predefined heuristics (e.g., presence of uncertainty phrases).
- Explainability & Compliance: The audit layer and blockchain hashing ensure transparency by tracking AI tool usage, data sources, and immutable response logs.

Generated Outputs & Quality

Strengths:
- AI responses are contextually grounded via RAG retrieval.
- Event-based auditing ensures accountability and traceability.
- Blockchain hashing prevents tampering and ensures a verifiable record of AI interactions.

Limitations:
- Rule-based completeness detection may produce false positives/negatives.

## Challenges, Surprises, and Key Takeaways

1. Challenge: Ensuring Response Completeness
- Current detection relies on static keyword matching, which can lead to misclassification.
- Solution: Implement LLM confidence scoring or vector-based semantic comparison.
2. Challenge: Retrieval Efficiency
- The accuracy of AI-generated responses depends on retrieved context.
- Solution: Optimize vector search embeddings and hybrid retrieval strategies.
3. Surprise: Blockchain-Based Auditing Enhances AI Trustworthiness
- Immutable response logging via Hedera Hashgraph makes this system more trustworthy for medical AI applications.
- Potential Expansion: Apply this blockchain-backed auditing approach to other compliance-heavy AI use cases.
4. Key Takeaway: RAG Outperforms Fine-Tuning for This Use Case
- Instead of static fine-tuning, dynamic retrieval and event auditing provide scalable, real-time improvements.

## Future Improvements & Next Steps

Enhancing AI Response Validation
- Upgrade the completeness detection system using LLM confidence scoring + semantic similarity metrics.
- Leverage FDA medical guidelines to further validate AI-generated responses.

Optimizing Retrieval Performance
- Implement reranking algorithms for higher retrieval precision.
- Improve query embeddings to capture better semantic relationships.

Expanding Explainability & Compliance
- Develop interactive dashboards for real-time AI audits.
- Integrate regulatory traceability features (e.g., audit logs for FDA submissions).

Broader Implications for GenAI in FDA
- Regulatory Alignment: Enables AI transparency and compliance.
- Clinical Decision Support: Provides AI-driven insights for medical research.
- Scalability: The modular RAG-based system can adapt to various healthcare AI use cases.

## Conclusion

This project represents a cutting-edge integration of AI, RAG, blockchain-based auditing, and event-driven traceability to enhance response accuracy, transparency, and regulatory compliance. By combining retrieval augmentation, response validation, event logging, and immutable blockchain hashing, the system ensures high-quality, verifiable AI responses for FDA and healthcare applications. Future optimizations in retrieval, response validation, and audit transparency will further position this system as a scalable and trustworthy solution for AI in healthcare.
