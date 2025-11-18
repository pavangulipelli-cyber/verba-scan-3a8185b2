import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, CheckCircle, Search, LogOut } from 'lucide-react';
import { mockDocuments, Document } from '@/data/mockDocuments';

const DocumentsDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const totalDocuments = mockDocuments.length;
  const pendingReview = mockDocuments.filter(doc => doc.status === 'Pending Review').length;
  const completed = mockDocuments.filter(doc => doc.status === 'Approved').length;

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusVariant = (status: Document['status']) => {
    switch (status) {
      case 'Pending Review':
        return 'warning';
      case 'Reviewed':
        return 'default';
      case 'Approved':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'Pending Review':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Reviewed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Approved':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <h1 className="text-xl font-semibold text-foreground">Documents Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.name}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Total Documents</p>
                  <p className="text-3xl font-bold text-foreground">{totalDocuments}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Pending Review</p>
                  <p className="text-3xl font-bold text-foreground">{pendingReview}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Completed</p>
                  <p className="text-3xl font-bold text-foreground">{completed}</p>
                </div>
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Toolbar */}
        <Card className="mb-6 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending Review">Pending Review</SelectItem>
                  <SelectItem value="Reviewed">Reviewed</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Document List */}
        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="shadow-sm hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-2">{doc.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>Uploaded: {new Date(doc.uploadedDate).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{doc.attributeCount} attributes</span>
                        <span>•</span>
                        <span>Confidence: {doc.confidence}%</span>
                        {doc.reviewedBy && (
                          <>
                            <span>•</span>
                            <span>Reviewed by {doc.reviewedBy}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={`${getStatusColor(doc.status)} border`}>
                      {doc.status}
                    </Badge>
                    <Button
                      onClick={() => navigate(`/documents/${doc.id}`)}
                      variant={doc.status === 'Pending Review' ? 'default' : 'outline'}
                    >
                      {doc.status === 'Pending Review' ? 'Review' : 'View'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default DocumentsDashboard;
