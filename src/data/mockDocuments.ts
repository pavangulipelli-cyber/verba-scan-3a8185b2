export interface Document {
  id: string;
  title: string;
  uploadedDate: string;
  attributeCount: number;
  confidence: number;
  status: 'Pending Review' | 'Reviewed' | 'Approved';
  reviewedBy?: string;
}

export interface Attribute {
  id: string;
  name: string;
  confidence: 'High' | 'Medium' | 'Low';
  confidenceScore: number;
  section: string;
  category: string;
  extractedValue: string;
  correctedValue?: string;
  page: number;
  highlightedText: string;
}

export const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Service Agreement – Acme Corp.pdf',
    uploadedDate: '2024-01-15',
    attributeCount: 10,
    confidence: 92,
    status: 'Pending Review',
  },
  {
    id: '2',
    title: 'Employment Contract – John Doe.pdf',
    uploadedDate: '2024-01-14',
    attributeCount: 15,
    confidence: 88,
    status: 'Reviewed',
    reviewedBy: 'Sarah Johnson',
  },
  {
    id: '3',
    title: 'Vendor Agreement – Tech Solutions.pdf',
    uploadedDate: '2024-01-13',
    attributeCount: 12,
    confidence: 95,
    status: 'Approved',
    reviewedBy: 'Mike Chen',
  },
  {
    id: '4',
    title: 'Lease Agreement – Office Space.pdf',
    uploadedDate: '2024-01-12',
    attributeCount: 8,
    confidence: 85,
    status: 'Pending Review',
  },
  {
    id: '5',
    title: 'Non-Disclosure Agreement – Partner Co.pdf',
    uploadedDate: '2024-01-11',
    attributeCount: 6,
    confidence: 98,
    status: 'Pending Review',
  },
];

export const mockAttributes: Record<string, Attribute[]> = {
  '1': [
    {
      id: 'attr-1',
      name: 'Contract Start Date',
      confidence: 'High',
      confidenceScore: 95,
      section: 'Term and Termination',
      category: 'Date',
      extractedValue: 'January 1, 2024',
      page: 1,
      highlightedText: 'This Agreement shall commence on January 1, 2024 and shall continue for a period of twelve (12) months unless earlier terminated in accordance with the provisions herein.',
    },
    {
      id: 'attr-2',
      name: 'Contract End Date',
      confidence: 'High',
      confidenceScore: 93,
      section: 'Term and Termination',
      category: 'Date',
      extractedValue: 'December 31, 2024',
      page: 1,
      highlightedText: 'The initial term of this Agreement shall expire on December 31, 2024, unless renewed or extended by mutual written agreement of both parties.',
    },
    {
      id: 'attr-3',
      name: 'Party A Name',
      confidence: 'High',
      confidenceScore: 98,
      section: 'Parties',
      category: 'Entity',
      extractedValue: 'Acme Corporation',
      page: 1,
      highlightedText: 'This Service Agreement ("Agreement") is entered into as of the date last signed below by and between Acme Corporation, a Delaware corporation ("Client"), and the service provider listed below.',
    },
    {
      id: 'attr-4',
      name: 'Party B Name',
      confidence: 'Medium',
      confidenceScore: 72,
      section: 'Parties',
      category: 'Entity',
      extractedValue: 'Tech Services LLC',
      page: 1,
      highlightedText: 'Service Provider: Tech Services LLC or its affiliated entities as may be designated from time to time ("Provider").',
    },
    {
      id: 'attr-5',
      name: 'Payment Terms',
      confidence: 'Low',
      confidenceScore: 65,
      section: 'Payment',
      category: 'Financial',
      extractedValue: 'Net 30 days',
      page: 2,
      highlightedText: 'Client shall pay all undisputed invoices within thirty (30) days of receipt. Payment terms may be modified by mutual agreement in writing.',
    },
    {
      id: 'attr-6',
      name: 'Total Contract Value',
      confidence: 'High',
      confidenceScore: 91,
      section: 'Compensation',
      category: 'Financial',
      extractedValue: '$120,000',
      page: 2,
      highlightedText: 'The total compensation for services rendered under this Agreement shall not exceed One Hundred Twenty Thousand Dollars ($120,000) for the initial term.',
    },
    {
      id: 'attr-7',
      name: 'Termination Notice Period',
      confidence: 'Medium',
      confidenceScore: 78,
      section: 'Termination',
      category: 'Terms',
      extractedValue: '30 days written notice',
      page: 3,
      highlightedText: 'Either party may terminate this Agreement for convenience upon thirty (30) days prior written notice to the other party.',
    },
    {
      id: 'attr-8',
      name: 'Governing Law',
      confidence: 'High',
      confidenceScore: 96,
      section: 'General Provisions',
      category: 'Legal',
      extractedValue: 'State of Delaware',
      page: 4,
      highlightedText: 'This Agreement shall be governed by and construed in accordance with the laws of the State of Delaware, without regard to its conflict of laws principles.',
    },
    {
      id: 'attr-9',
      name: 'Confidentiality Duration',
      confidence: 'Low',
      confidenceScore: 68,
      section: 'Confidentiality',
      category: 'Terms',
      extractedValue: '2 years after termination',
      page: 3,
      highlightedText: 'The obligations of confidentiality shall survive for a period of two (2) years following the termination or expiration of this Agreement.',
    },
    {
      id: 'attr-10',
      name: 'Liability Cap',
      confidence: 'Medium',
      confidenceScore: 75,
      section: 'Limitation of Liability',
      category: 'Financial',
      extractedValue: '$50,000',
      page: 4,
      highlightedText: 'In no event shall either party\'s aggregate liability exceed Fifty Thousand Dollars ($50,000) or the total fees paid under this Agreement, whichever is greater.',
    },
  ],
};
