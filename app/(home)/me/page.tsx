"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Upload } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface UserProfile {
  username: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  github_url?: string;
  leetcode_url?: string;
  bio?: string;
  image?: string;
}

export default function ProfilePage() {
  // Mock user data (replace with API fetch)
  const [user, setUser] = useState<UserProfile>({
    username: "nikku_kdas",
    email: "nikku@example.com",
    phone: "+91 9876543210",
    linkedin_url: "https://linkedin.com/in/nikku",
    github_url: "https://github.com/nikku",
    leetcode_url: "https://leetcode.com/nikku",
    bio: "Full-stack developer passionate about DSA, design, and problem-solving.",
    image: "/default-avatar.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(user.image || null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
    // Here you’ll send data + image to backend via API
    console.log("Saving:", user);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen space-y-4 mt-10 bg-background text-foreground p-6 md:p-12 flex flex-col items-center">
      <Card className="w-full max-w-3xl shadow-lg border-border">
        <CardHeader className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="relative">
            <Avatar className="h-28 w-28">
              <AvatarImage src={previewImage || ""} alt={user.username} />
              <AvatarFallback>{user.username?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            {isEditing && (
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer hover:opacity-90"
              >
                <Upload className="w-4 h-4" />
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex flex-col gap-2 text-center md:text-left">
            <CardTitle className="text-2xl font-bold">{user.username}</CardTitle>
            <p className="text-muted-foreground text-sm">{user.email}</p>
            {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}

            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setIsEditing(true)}
              >
                <Pencil className="w-4 h-4 mr-2" /> Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="p-6 space-y-6">
          {/* Editable Fields */}
          {isEditing ? (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>Username</Label>
                  <Input
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={user.phone || ""}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label>LinkedIn</Label>
                  <Input
                    value={user.linkedin_url || ""}
                    onChange={(e) => setUser({ ...user, linkedin_url: e.target.value })}
                    placeholder="https://linkedin.com/in/..."
                  />
                </div>
                <div>
                  <Label>GitHub</Label>
                  <Input
                    value={user.github_url || ""}
                    onChange={(e) => setUser({ ...user, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                  />
                </div>
              </div>

              <div>
                <Label>LeetCode</Label>
                <Input
                  value={user.leetcode_url || ""}
                  onChange={(e) => setUser({ ...user, leetcode_url: e.target.value })}
                  placeholder="https://leetcode.com/..."
                />
              </div>

              <div>
                <Label>Bio</Label>
                <Textarea
                  value={user.bio || ""}
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  placeholder="Write something about yourself..."
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save Changes</Button>
              </div>
            </>
          ) : (
            <>
              {/* Non-editable view */}
              <div>
                <h3 className="font-semibold text-lg mb-2">Bio</h3>
                <p className="text-muted-foreground">{user.bio || "No bio added yet."}</p>
              </div>

              <div className="grid gap-3">
                {user.linkedin_url && (
                  <a
                    href={user.linkedin_url}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    LinkedIn
                  </a>
                )}
                {user.github_url && (
                  <a
                    href={user.github_url}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    GitHub
                  </a>
                )}
                {user.leetcode_url && (
                  <a
                    href={user.leetcode_url}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    LeetCode
                  </a>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
