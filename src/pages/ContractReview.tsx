import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, FileText, Save, CheckCircle2 } from 'lucide-react';
import { mockDocuments, mockAttributes } from '@/data/mockDocuments';
import { useToast } from '@/hooks/use-toast';

const ContractReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAttributeId, setSelectedAttributeId] = useState<string | null>(null);
  const [correctedValues, setCorrectedValues] = useState<Record<string, string>>({});

  const document = mockDocuments.find((doc) => doc.id === id);
  const attributes = id ? mockAttributes[id] || [] : [];
  const selectedAttribute = attributes.find((attr) => attr.id === selectedAttributeId) || attributes[0];

  const filteredAttributes = attributes.filter((attr) =>
    attr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    attr.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const lowConfidenceCount = attributes.filter((attr) => attr.confidence === 'Low').length;

  const getConfidenceBadgeColor = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 'bg-success/10 text-success border-success/20';
      case 'Medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Low':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleCorrectedValueChange = (attrId: string, value: string) => {
    setCorrectedValues((prev) => ({ ...prev, [attrId]: value }));
  };

  const handleAcceptAll = () => {
    toast({
      title: "Values Accepted",
      description: "All extracted values have been accepted.",
    });
  };

  const handleSaveReview = () => {
    toast({
      title: "Review Saved",
      description: "Your review has been saved successfully.",
    });
  };

  if (!document) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Document not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <Button
              variant="ghost"
              onClick={() => navigate('/documents')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Documents
            </Button>
            <div className="text-sm text-muted-foreground">
              Document ID: {document.id} • {attributes.length} attributes • {lowConfidenceCount} low confidence
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-1">Contract Review</h1>
            <p className="text-sm text-muted-foreground">AI-powered attribute extraction and validation</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Panel - Extracted Attributes */}
          <div className="space-y-4">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Extracted Attributes</CardTitle>
                <CardDescription>
                  Review and correct attributes. Low-confidence values are highlighted.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search attributes or sections..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Attributes List */}
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                  {filteredAttributes.map((attr) => (
                    <Card
                      key={attr.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedAttribute?.id === attr.id
                          ? 'ring-2 ring-primary shadow-md'
                          : ''
                      }`}
                      onClick={() => setSelectedAttributeId(attr.id)}
                    >
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-foreground">{attr.name}</h4>
                          <Badge className={`${getConfidenceBadgeColor(attr.confidence)} border flex-shrink-0`}>
                            {attr.confidence} ({attr.confidenceScore}%)
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Section: {attr.section} – {attr.category}
                        </p>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">
                            Extracted Value
                          </label>
                          <div className="bg-muted/50 px-3 py-2 rounded-md text-sm">
                            {attr.extractedValue}
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground block mb-1">
                            Corrected Value (if needed)
                          </label>
                          <Input
                            value={correctedValues[attr.id] || ''}
                            onChange={(e) => handleCorrectedValueChange(attr.id, e.target.value)}
                            placeholder="Enter correction..."
                            className="text-sm"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <Button onClick={handleAcceptAll} className="flex-1 gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Accept All Extracted Values
                  </Button>
                  <Button onClick={handleSaveReview} variant="outline" className="flex-1 gap-2">
                    <Save className="h-4 w-4" />
                    Save Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Contract Document */}
          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Contract Document</CardTitle>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Viewing: <span className="font-medium text-foreground">{selectedAttribute?.name}</span></p>
                  <p>Section: <span className="font-medium text-foreground">{selectedAttribute?.section}</span></p>
                  <p>Page: <span className="font-medium text-foreground">{selectedAttribute?.page}</span></p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* PDF Viewer Placeholder */}
                <div className="border-2 border-dashed border-border rounded-lg bg-muted/30 p-12 text-center min-h-[400px] flex items-center justify-center">
                  <div className="space-y-3">
                    <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">PDF Viewer Placeholder</p>
                      <p className="text-sm text-muted-foreground max-w-md">
                        In production, this will display the contract PDF with the relevant section highlighted.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Highlighted Section Text */}
                <Card className="bg-accent/30 border-accent">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-sm text-foreground mb-2">Highlighted Section Text</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {selectedAttribute?.highlightedText}
                    </p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContractReview;
